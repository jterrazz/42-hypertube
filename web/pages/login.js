import React, {Component} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {Form} from "../components/templates/FormLogin";
import {login} from '../store/actions/auth'

import {authentified} from "../wrappers/auth";
import Router from "next/router";
import {connect} from 'react-redux'
import Copyright from "../components/atoms/Copyright";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('UserName is required')
    .min(3, 'Too Short!')
    .max(42, 'Too Long!')
    .strict()
    .matches(/^[a-zA-Z0-9]+$/, 'The username must contains english letters and digits only, Spaces not allowed'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .max(100, 'Too Long!')
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
    this.props.dispatch(login(user))
      .then(() => Router.push('/'))
      .catch(error => {
        error.response && error.response.status === 401
          ? this.setState({ErrorAuth: "Wrong username/password"})
          : this.setState({ErrorAuth: "Unknown error. Please try again"});
      })
  }

  render() {
    const values = {username: "", password: ""};

    return (
      <>
        <Formik
          render={props => <Form {...props} error={this.state.ErrorAuth}
                                 onChange={this.onChange}/>}
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={this.handleSubmit}
        />
        <div>
          <Copyright />
        </div>
      </>
    )
  }
}

Login.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default authentified(false)(connect()(Login));
