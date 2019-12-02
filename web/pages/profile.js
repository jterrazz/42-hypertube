import React, {Component} from 'react';
import * as Yup from "yup";
import {fetchUserIfNeeded, patchUser} from "../store/actions/auth";
import {connect} from "react-redux";
import matchaClient from '../services/matcha-api'
import {authentified} from "../wrappers/auth";
import Profile from "../components/templates/Profile";

const FILE_SIZE = 10 * 1000 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchemaPassword = Yup.object({
  password: Yup.string()
    .min(8, "Password must contain at least 8 characters")
    .max(100, 'Too Long!')
    .required("Enter your password"),
  confirmPassword: Yup.string("Enter your password")
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match")
});

const validationSchemaInfos = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  username: Yup.string()
    .required('UserName is required')
    .min(3, 'Too Short!')
    .max(42, 'Too Long!')
    .strict()
    .trim('Spaces not allowed in UserName'),
});

const validationSchemaImage = Yup.object({
  profileImage: Yup.mixed().notRequired()
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileSize",
      "File too large",
      value => value && value.size <= FILE_SIZE
    )
});

class profile extends Component {

  static async getInitialProps({req, matchaClient, store}) {
    if (!req) {
      store.dispatch(fetchUserIfNeeded(matchaClient, true))
    }
    return {
      namespacesRequired: ['common'],
    }
  }

  state = {
    ErrorInfo: '',
    ErrorImage: '',
    ErrorPassword: ''
  };

  onChange = () => {
    this.setState({ErrorInfo: ""});
  };

  onChangeImage = () => {
    this.setState({ErrorImage: ""});
  };

  onChangePassword = () => {
    this.setState({ErrorPassword: ""});
  };

  SubmitImage = (userData) => {
    // TODO Replace by redux
    matchaClient.patchMe(_.pick(userData, ['profileImage'])) // TODO Probably put the pick inside the component
      .then()
      .catch(error => {
        this.setState({ErrorImage: "Unknown error. Please try again"});
      })
  };
// TODO Rename
  SubmitInfos = (userData) => {
    this.props.dispatch(patchUser(_.pick(userData, ['firstName', 'lastName', 'email', 'language', 'username']))) // TODO Probably put the pick inside the component
      .then()
      .catch(error => {
        error.response && error.response.status === 409
          ? this.setState({ErrorInfo: error.response.data})
          : this.setState({ErrorInfo: "Unknown error. Please try again"});
      })
  };

  SubmitPassword = (userData) => {
    // TODO + check passwords are the same
    // TODO + error not printing
    matchaClient.patchMe(_.pick(userData, ['password'])) // TODO Probably put the pick inside the component
      .then()
      .catch(error => {
        this.setState({ErrorPassword: "Unknown error. Please try again"});
      })
  };

  async componentDidMount() {
    if (!this.props.me.profileImageUrl)
      this.setState({ErrorImage: 'Please set profile photo'});
  }

  render() {
    const value = {confirmPassword: "", password: ""};
    const valueImage = {profileImage: ""};

    return (
      <Profile
        validationSchemaPassword={validationSchemaPassword}
        validationSchemaInfos={validationSchemaInfos}
        validationSchemaImage={validationSchemaImage}
        onChange={this.onChange}
        SubmitImage={this.SubmitImage}
        SubmitInfos={this.SubmitInfos}
        SubmitPassword={this.SubmitPassword}
        onChangeImage={this.onChangeImage}
        onChangePassword={this.onChangePassword}
        me={this.props.me}
        ErrorImage={this.state.ErrorImage}
        ErrorInfo={this.state.ErrorInfo}
        ErrorPassword={this.state.ErrorPassword}
        value={value}
        valueImage={valueImage}
      />
    )
  }
}

const mapStateToProps = state => ({
  me: state.auth.user
});

export default authentified(true)(connect(mapStateToProps)(profile));
