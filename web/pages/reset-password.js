import React, {Component} from 'react'
import * as Yup from 'yup';
import axios from 'axios';
import ApiURL from '../config/ApiURL';
import { withRouter } from "next/router";
import { Form } from '../components/templates/FormResetPassword';
import { Formik } from "formik";

const validationSchema = Yup.object({
  password: Yup.string("")
    .min(8, "Password must contain atleast 8 characters")
    .required("Enter your password"),
  confirmPassword: Yup.string("Enter your password")
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match")
});

axios.defaults.withCredentials = true;

class Forgot extends Component {
  state = {
    password: null
  };

  static async getInitialProps({ query }) {
    return {
      token: query.token,
    }
  }

  Submit = (data) => {
    event.preventDefault();

    const user = {
      token: this.props.token,
      password: data.password,
    };

    axios.post(ApiURL.reset_password, user)
      .then(
        response => {
          if (response.data === 'OK') {
            window.location = "/";
          }
        })
      .catch(error => {
        console.log(error);
        if (error.response === 401){
          setSubmitting(false);
        }
      })
  };

  render () {
    const values = { confirmPassword: "", password: "" };

    return (
      <Formik
        render={props => <Form {...props} />}
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={this.Submit}
      />
    )
  }
}

export default withRouter(Forgot);
