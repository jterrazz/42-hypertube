import React, {Component} from 'react';
import * as Yup from "yup";
import {fetchUserIfNeeded, patchUser} from "../store/actions/auth";
import {connect} from "react-redux";
import matchaClient from '../services/matcha-api'
import {authentified} from "../wrappers/auth";
import Profile from "../components/templates/Profile";
import NavBar from "../components/organisms/NavBar";
import Copyright from "../components/atoms/Copyright";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
  footer: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 240,
    }
  }
});

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
  firstName: Yup.string()
    .required('Required')
    .min(3, 'Too Short!')
    .max(42, 'Too Long!')
    .strict()
    .matches(/[[a-zA-ZÀ-ú]+[\-\s]?]*/, 'The First Name must contains french letters only'),
  lastName: Yup.string()
    .required('Required')
    .min(3, 'Too Short!')
    .max(42, 'Too Long!')
    .strict()
    .matches(/[[a-zA-ZÀ-ú]+[\-\s]?]*/, 'The Last Name must contains french letters only'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  username: Yup.string()
    .required('UserName is required')
    .min(3, 'Too Short!')
    .max(42, 'Too Long!')
    .strict()
    .matches(/^[a-zA-Z0-9]+$/, 'The username must contains english letters and digits only, Spaces not allowed')
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
    ErrorPassword: '',
    infoPassword: ''
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
    this.props.dispatch(patchUser(_.pick(userData, ['profileImage'])))
      .then(this.setState({ErrorImage: ''}))
      .catch(_ => {
        this.setState({ErrorImage: "Unknown error. Please try again"});
      })
  };

  SubmitInfos = (userData) => {
    this.props.dispatch(patchUser(_.pick(userData, ['firstName', 'lastName', 'email', 'language', 'username'])))
      .then()
      .catch(error => {
        error.response && error.response.status === 409 || error.response.status === 422
          ? this.setState({ErrorInfo: error.response.data})
          : this.setState({ErrorInfo: "Unknown error. Please try again"});
      })
  };

  SubmitPassword = (userData) => {
    matchaClient.patchMe(_.pick(userData, ['password']))
      .then(this.setState({infoPassword: ''}))
      .catch(error => {
        this.setState({ErrorPassword: "Unknown error. Please try again"});
      })
  };

  async componentDidMount() {
    if (!this.props.me.profileImageUrl)
      this.setState({ErrorImage: 'Please set profile photo'});
    if (this.props.me.noPassword)
      this.setState({infoPassword: 'You can also add a password if you want to login using it'});
    if (!this.props.me.username || !this.props.me.lastName || !this.props.me.firstName)
      this.setState({ErrorInfo: 'Complete your profile info'});
  }

  render() {
    const value = {confirmPassword: "", password: ""};
    const valueImage = {profileImage: ""};
    const {classes} = this.props;

    return (
      <>
        <div style={{ display: 'flex' }}>
          <NavBar />
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
            infoPassword={this.state.infoPassword}
            value={value}
            valueImage={valueImage}
          />
        </div>
        <div className={classes.footer}>
          <Copyright />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  me: state.auth.user
});

export default withStyles(styles)(authentified(true)(connect(mapStateToProps)(profile)));
