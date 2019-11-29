import React, {Component} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {Form} from "../components/templates/FormForgot";
import matchaAPI from '../services/matcha-api'
import Router from 'next/router'
import {authentified} from "../wrappers/auth";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('UserName is required')
    .min(3, 'Too Short!')
    .max(42, 'Too Long!')
    .strict()
    .trim('Spaces not allowed in UserName'),
});

class Forgot extends Component {
  state = {
    ErrorUserName: "",
  };

  onChange = () => {
    this.setState({ErrorUserName: ""});
  };

  handleSubmit = (data) => {
    matchaAPI.postForgotPassword(username)
      .then(() => {
        Router.push('/')
      })
      .catch(error => {
        error.response && error.response.status === 404
          ? this.setState({ErrorUserName: "Username not found"})
          : this.setState({ErrorUserName: "Unknown error. Please try again"});
      });
  };

  render() {
    const values = {username: ""};

    return (
      <Formik
        render={props => <Form {...props} error={this.state.ErrorUserName} onChange={this.onChange}/>}
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default authentified(false)(Forgot);
