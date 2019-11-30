import React, {Component} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {Form} from "../components/templates/FormSignup";
import matchaAPI from '../services/matcha-api'
import {Router} from "next/router";
import {authentified} from "../wrappers/auth";

const FILE_SIZE = 10 * 1000 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required')
    .min(3, 'Too Short!')
    .max(42, 'Too Long!'),
  lastName: Yup.string()
    .required('Required')
    .min(3, 'Too Short!')
    .max(42, 'Too Long!'),
  userName: Yup.string()
    .required('UserName is required')
    .min(3, 'Too Short!')
    .max(42, 'Too Long!')
    .strict()
    .trim('Spaces not allowed in UserName'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .max(100, 'Too Long!')
    .required('Enter your password'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
  file: Yup.mixed()
    .required("A photo is required")
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileSize",
      "File too large",
      value => value && value.size <= FILE_SIZE
    ),
  reCaptcha: Yup.string().required('Required'), // TODO Put back
});

class SignUp extends Component {
  state = {
    Error: '',
    refCaptcha: '',
  };

  onChange = () => {
    this.setState({Error: ""});
  };

  setRefCaptcha = (ref) => {
    if (ref)
      this.refCaptcha = ref;
  };

  handleSubmit = (userData, {setFieldValue}) =>
    matchaAPI.signup(userData)
      .then(() => Router.push('/'))
      .catch(error => {
        this.refCaptcha.reset();
        setFieldValue('reCaptcha', '');
        if (error.response && (error.response.status === 422 || error.response.status === 409)) {
          this.setState({Error: error.response.data});
        }
      });

  render() {
    const values = {
      userName: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: "",
      file: "",
      reCaptcha: ""
    };
    return (
      <Formik
        render={props => <Form {...props} error={this.state.Error} onChange={this.onChange} setRefCaptcha={this.setRefCaptcha}/>}
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default authentified(false)(SignUp);
