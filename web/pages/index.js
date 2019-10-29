import React, {Component} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import API from '../src/API'
import { login, withAuthSync } from '../utils/auth'
import { Form } from "../src/FormLogin";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
});

axios.defaults.withCredentials = true;

class Login extends Component {

  handleSubmit = (data) => {

    const user = {
      username: data.username,
      password: data.password
    };

    axios.post(API.signin, user)
      .then(
        response => {
          if (response.data.message === 'Authentication successful') {
            const { token } = response.data;
            login ({ token });
          }
        })
      .catch(error => {
        return error.response && error.response.status === 404
          ? "Wrong email/password"
          : "Unknown error. Please try again";
        });
    event.preventDefault();
  };

  render() {
    const values = { username: "", password: "" };

    return (
      <Formik
        render={props => <Form {...props} />}
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default Login;