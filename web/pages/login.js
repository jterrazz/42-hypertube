import React, {Component} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import { login } from '../utils/auth'
import { Form } from "../components/templates/FormLogin";
import i18next from "i18next";
import nextCookie from 'next-cookies';

import matchaAPI from '../services/matcha-api'

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
});

class Login extends Component {
  state = {
    ErrorAuth: '',
  };

  // static async getInitialProps(ctx) {
  //   console.log(nextCookie(ctx)['koa:sess']);
  //   console.log(nextCookie(ctx)['koa:sess.sig']);
  //   return {}
  // };

  onChange = () => {
    this.setState({ ErrorAuth: ""});
  };

  handleSubmit = ({ username, password }) =>
    matchaAPI.signin(username, password)
      .then(() => {
        // i18next.changeLanguage(response.data.user.language); // TODO Centralise in redux
        login();
      })
      .catch(error => {
        return error.response && error.response.status === 401
            ? this.setState({ ErrorAuth: "Wrong email/password"})
            : this.setState({ ErrorAuth: "Unknown error. Please try again"});
      });

  render() {
    const values = { username: "", password: "" };

    return (
      <Formik
        render={props => <Form {...props} error={this.state.ErrorAuth} onChange={this.onChange}/>}
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default Login;
