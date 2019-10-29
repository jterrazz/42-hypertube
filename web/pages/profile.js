import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid'
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import axios from "axios";
import NavBar from "../src/NavBar";
import { withAuthSync } from '../utils/auth'
import {Formik} from "formik";
import FormPassword from "../src/FormProfileChangePassword";
import FormInfos from "../src/FormProfileChangeInfos";
import * as Yup from "yup";
import API from "../src/API";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5, 10),
    backgroundColor: "#F8E5E9",
    borderRadius: 15,
    marginTop: 40,
  },
  welcome: {
    color: "#FF808B",
    marginBottom: 30,
  },
  main_profile: {
    backgroundColor: "#F6F4FC",
  },
});

const FILE_SIZE = 1600 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchemaPassword = Yup.object({
  password: Yup.string("")
    .min(8, "Password must contain atleast 8 characters")
    .required("Enter your password"),
  confirmPassword: Yup.string("Enter your password")
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match")
});

const validationSchemaInfos = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    profileImageUrl: Yup.lazy(value => {
      if (value !== undefined) {
        return Yup.mixed()
          .test(
            "fileFormat",
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS.includes(value.type)
          )
          .test(
            "fileSize",
            "File too large",
            value => value && value.size <= FILE_SIZE
          )
      }
      return Yup.mixed().notRequired()
    })
  });

axios.defaults.withCredentials = true;

class Profile extends Component {

  state = {
    me: null,
  };

  async componentDidMount() {
    const response = await axios.get(API.me);

    const responseData = await response.data;

    this.setState({ me: responseData })
  }

  SubmitInfos = (data) => {
    const userData = new FormData();
    userData.append('firstName', data.firstName);
    userData.append('lastName', data.lastName);
    userData.append('email', data.email);
    console.log(data.profileImageUrl);
    userData.append('profileImage', data.profileImageUrl);
    console.log(data.profileImageUrl);
    userData.append('language', data.language);
    axios.patch(API.me, userData)
      .then(response => {
        console.log(response);
        if (response.data === 'OK') {
          // window.location = '/profile'
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401){
          setSubmitting(false);
        }
      });

    event.preventDefault();
  };

  SubmitPassword = (data) => {
    const userData = new FormData();
    userData.append('password', data.password);
    axios.patch(API.me, userData)
      .then(response => {
        console.log(response);
        if (response.data === 'OK') {
          window.location = '/profile'
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401){
          setSubmitting(false);
        }
      });

    event.preventDefault();
  };

  render () {
    const { classes } = this.props;
    const value = { confirmPassword: "", password: ""};

    return (
      <div className={classes.root}>
        <NavBar />
        <main className={classes.content} >
          <div className={classes.toolbar} />
          <Container fixed>
            <Typography variant="h5">
              dashboard
            </Typography>
            <Paper className={classes.paper} elevation={0}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" component="h3" className={classes.welcome}>
                    Welcome back abbensid!
                  </Typography>
                  <Typography component="h4">
                    <div>Paper can be used to build surface</div>
                    <div>Or other elements for your application.</div>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardMedia
                    title="Vector"
                    image="/static/ilustracion-vector.png"
                    style={{ height: 150}}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Typography variant="h5" style={{ marginTop: 40 }}>
              Settings Profile
            </Typography>
            <Grid container spacing={5}>
              {this.state.me ?
              <Grid item md={4}>
                <Formik
                  render={props => <FormInfos {...props} />}
                  initialValues={this.state.me}
                  validationSchema={validationSchemaInfos}
                  onSubmit={this.SubmitInfos}
                />
              </Grid>
                : ''}
              <Grid item md={4}>
                <Formik
                  render={props => <FormPassword {...props} />}
                  initialValues={value}
                  validationSchema={validationSchemaPassword}
                  onSubmit={this.SubmitPassword}
                />
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    )
  }
}

export default withAuthSync(withStyles(styles)(Profile));
