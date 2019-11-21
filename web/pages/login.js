import React, {Component} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import ApiURL from '../utils/ApiURL'
import { login } from '../utils/auth'
import { Form } from "../src/components/templates/FormLogin";
import i18next from "i18next";
import nextCookie from 'next-cookies';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
});

axios.defaults.withCredentials = true;

class Login extends Component {

  state = {
    ErrorAuth: '',
  };

  static async getInitialProps(ctx) {
    console.log(nextCookie(ctx)['koa:sess']);
    console.log(nextCookie(ctx)['koa:sess.sig']);
    return {}
  };

  onChange = () => {
    this.setState({ ErrorAuth: ""});
  };

  handleSubmit = (data) => {
    const user = {
      username: data.username,
      password: data.password
    };

    axios.post(ApiURL.signin, user)
      .then(
        response => {
          if (response.data.message === 'Authentication successful') {
            const { token } = response.data;
            i18next.changeLanguage(response.data.user.language);
            login ({ token });
          }
        })
      .catch(error => {
        return error.response && error.response.status === 401
          ? this.setState({ ErrorAuth: "Wrong email/password"})
          : this.setState({ ErrorAuth: "Unknown error. Please try again"});
        });
    event.preventDefault();
  };

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
