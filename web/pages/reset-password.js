import React, {Component} from 'react'
import * as Yup from 'yup';
import Router from "next/router";
import {Form} from '../components/templates/FormResetPassword';
import {Formik} from "formik";
import matchaClient from '../services/matcha-api'
import {authentified} from "../wrappers/auth";
import Copyright from "../components/atoms/Copyright";

const validationSchema = Yup.object({
  password: Yup.string("")
    .min(8, "Password must contain atleast 8 characters")
    .max(100, 'Too Long!')
    .required("Enter your password"),
  confirmPassword: Yup.string("Enter your password")
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match")
});

class Forgot extends Component {

  state = {
    Error: '',
    errorToken: false
  };

  static async getInitialProps({query}) {
    let errorToken = false;
    if (!query.token || !(typeof query.token === 'string'))
      errorToken = true;
    return {
      token: query.token,
      errorToken,
      namespacesRequired: ['common'],
    }
  }

  componentDidMount() {
    this.setState({errorToken: this.props.errorToken})
  }

  onSubmit = (data) => {
    const user = {
      token: this.props.token,
      password: data.password,
    };

    matchaClient.postResetPassword(user)
      .then(() => Router.push('/'))
      .catch(error => {
        error.response && error.response.status === 401
          ? this.setState({Error: "This authentication token is not valid"})
          : this.setState({Error: "Unknown error. Please try again"});
      });
  };

  render() {
    const values = {confirmPassword: "", password: ""};

    return (
      <>
        <Formik
          render={props => <Form {...props} error={this.state.Error} errorToken={this.state.errorToken}/>}
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        />
        <div>
          <Copyright />
        </div>
      </>
    )
  }
}

export default authentified(false)(Forgot);
