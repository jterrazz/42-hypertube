import React, {Component} from 'react';
import * as Yup from "yup";
import {fetchUserIfNeeded, patchUser} from "../store/actions/auth";
import {connect} from "react-redux";
import matchaClient from '../services/matcha-api'
import {authentified} from "../wrappers/auth";
import { Profile } from "../components/templates/Profile";

const FILE_SIZE = 1600 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchemaPassword = Yup.object({
  password: Yup.string()
    .min(8, "Password must contain at least 8 characters")
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
    .required('Email is required')
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
    return {}
  }

  state = {
    ErrorMail: '',
    Error: ''
  };

  onChange = () => {
    this.setState({ErrorMail: ""});
  };

  SubmitImage = (userData) => {
    // TODO Replace by redux
    matchaClient.patchMe(_.pick(userData, ['profileImage'])) // TODO Probably put the pick inside the component
      .then()
      .catch(error => {
        this.setState({Error: "Unknown error. Please try again"});
      })
  };
// TODO Rename
  SubmitInfos = (userData) => {
    this.props.dispatch(patchUser(_.pick(userData, ['firstName', 'lastName', 'email', 'language']))) // TODO Probably put the pick inside the component
      .then()
      .catch(error => {
        error.response && error.response.status === 409
          ? this.setState({ErrorMail: "This email is already in use"})
          : this.setState({ErrorMail: "Unknown error. Please try again"});
      })
  };

  SubmitPassword = (userData) => {
    // TODO + check passwords are the same
    // TODO + error not printing
    matchaClient.patchMe(_.pick(userData, ['password'])) // TODO Probably put the pick inside the component
      .then()
      .catch(error => {
        this.setState({Error: "Unknown error. Please try again"});
      })
  };

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
        me={this.props.me}
        Error={this.state.Error}
        ErrorMail={this.state.ErrorMail}
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
