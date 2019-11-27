import React, {Component} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {Form} from "../components/templates/FormLogin";
import {login} from '../store/actions/auth'

import {authentified} from "../wrappers/auth";
import Router from "next/router";
import {connect} from 'react-redux'

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

  onChange = () => {
    this.setState({ErrorAuth: ""});
  };

  handleSubmit = (user) => {
    this.props.dispatch(login(user)) // TODO Import and use dispatch args
      .then(() => {
        Router.push('/')
      })
      .catch(error => {
        console.log(error)
        error.response && error.response.status === 401
          ? this.setState({ErrorAuth: "Wrong email/password"})
          : this.setState({ErrorAuth: "Unknown error. Please try again"});
      })
  }

  render() {
    const values = {username: "", password: ""};

    return (
      <Formik
        render={props => <Form {...props} error={this.state.ErrorAuth}
                               onChange={this.onChange}/>}
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default authentified(false)(connect()(Login));
