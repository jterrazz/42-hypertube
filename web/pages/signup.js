import React, {Component} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {Form} from "../components/templates/FormSignup";
import Router from "next/router";
import {authentified} from "../wrappers/auth";
import {connect} from 'react-redux'
import {register} from "../store/actions/auth";
import Copyright from "../components/atoms/Copyright";

const FILE_SIZE = 10 * 1000 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required')
    .min(3, 'Too Short!')
    .max(42, 'Too Long!')
    .strict()
    .matches(/[[a-zA-ZÀ-ú]+[\-\s]?]*/, 'The First Name must contains french letters only'),
  lastName: Yup.string()
    .required('Required')
    .min(3, 'Too Short!')
    .max(42, 'Too Long!')
    .strict()
    .matches(/[[a-zA-ZÀ-ú]+[\-\s]?]*/, 'The Last Name must contains french letters only'),
  userName: Yup.string()
    .required('UserName is required')
    .min(3, 'Too Short!')
    .max(42, 'Too Long!')
    .strict()
    .matches(/^[a-zA-Z0-9]+$/, 'The username must contains english letters and digits only'),
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
  reCaptcha: Yup.string().required('Required'),
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

  handleSubmit = async (userData, {setFieldValue}) =>
    await this.props.dispatch(register(userData))
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
      <>
        <Formik
          render={props => <Form {...props} error={this.state.Error} onChange={this.onChange} setRefCaptcha={this.setRefCaptcha}/>}
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

SignUp.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default authentified(false)(connect()(SignUp));
