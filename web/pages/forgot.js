import React, {Component} from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from "axios"
import {Form} from "../src/components/templates/FormForgot";
import ApiURL from "../utils/ApiURL";

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required('Required')
    .strict()
    .trim('Spaces not allowed in UserName'),
});

axios.defaults.withCredentials = true;

class Forgot extends Component {

  state = {
    ErrorUserName: '',
  };

  onChange = () => {
    this.setState({ ErrorUserName: ""});
  };

  handleSubmit = (data) => {
    axios.post(`${ApiURL.forgot}?username=${data.userName}`)
      .then(
        response => {
          if (response.data === 'OK') {
            window.location = "/"
          }
        })
      .catch(error => {
        return error.response && error.response.status === 404
          ? this.setState({ ErrorUserName: "Username not found"})
          : this.setState({ ErrorUserName: "Unknown error. Please try again"});
      });
    event.preventDefault();
  };

  render() {
    const values = { userName: "" };

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

export default Forgot;
