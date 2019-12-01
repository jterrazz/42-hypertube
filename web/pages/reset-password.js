import React, {Component} from 'react'
import * as Yup from 'yup';
import {Router} from "next/router";
import {Form} from '../components/templates/FormResetPassword';
import {Formik} from "formik";
import matchaClient from '../services/matcha-api'
import {authentified} from "../wrappers/auth";

const validationSchema = Yup.object({
  password: Yup.string("")
    .min(8, "Password must contain atleast 8 characters")
    .required("Enter your password"),
  confirmPassword: Yup.string("Enter your password")
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match")
});

class Forgot extends Component {

  static async getInitialProps({query}) {
    return {
      token: query.token,
      namespacesRequired: ['common'],
    }
  }

  onSubmit = (data) => {
    const user = {
      token: this.props.token,
      password: data.password,
    };

    matchaClient.postResetPassword(user)
      .then(() => Router.push('/'))
      .catch(_ => {})
  };

  render() {
    const values = {confirmPassword: "", password: ""};

    return (
      <Formik
        render={props => <Form {...props} />}
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default authentified(false)(Forgot);
