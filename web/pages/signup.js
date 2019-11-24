import React, {Component} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import ApiURL from '../services/ApiURL'
import { Form } from "../components/templates/FormSignup";

const FILE_SIZE = 1600 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  userName: Yup.string()
    .required('Required')
    .strict()
    .trim('Spaces not allowed in UserName'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
  file: Yup.mixed()
    .required("A file is required")
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileSize",
      "File too large",
      value => value && value.size <= FILE_SIZE
    ),
  reCaptcha: Yup.string().required('Required'),
});

axios.defaults.withCredentials = true;

class SignUp extends Component {
  state = {
    Error: '',
  };

  handleSubmit = (data) => {
    const userData = new FormData();
    userData.append('firstName', data.firstName);
    userData.append('lastName', data.lastName);
    userData.append('username', data.userName);
    userData.append('password', data.password);
    userData.append('email', data.email);
    userData.append('profileImage', data.file);

    axios.post(ApiURL.signup, userData)
      .then(response => {
        if (response.data.message === 'Authentication successful') {
          window.location = '/'
        }
      })
      .catch(error => {
        if (error.response){
          if (error.response.status === 422){
            this.setState({ Error: error.response.data });
          }
          if (error.response.status === 409){
            this.setState({ Error: error.response.data });
          }
        }
      });
    event.preventDefault();
  };

  render () {
    const values = { userName: "", password: "", confirmPassword: "", firstName: "", lastName: "", email: "", file: "", reCaptcha: ""};
    return (
      <Formik
        render={props => <Form {...props} error={this.state.Error} />}
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default SignUp;
