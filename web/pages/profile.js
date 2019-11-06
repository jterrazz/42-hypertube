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
import {withTranslation} from "react-i18next";

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
    profileImageUrl: Yup.mixed().notRequired()
      // .test(
      //   "fileFormat",
      //   "Unsupported Format",
      //   value => value && SUPPORTED_FORMATS.includes(value.type)
      // )
      // .test(
      //   "fileSize",
      //   "File too large",
      //   value => value && value.size <= FILE_SIZE
      // )
  });

axios.defaults.withCredentials = true;

class Profile extends Component {

  state = {
    me: null,
    ErrorMail: ''
  };

  async componentDidMount() {
    const response = await axios.get(API.me);

    const responseData = await response.data;

    this.props.i18n.changeLanguage('fr');

    this.setState({ me: responseData })
  }

  onChange = () => {
    this.setState({ ErrorMail: ""});
  };

  SubmitInfos = (data) => {
    const userData = new FormData();
    userData.append('firstName', data.firstName);
    userData.append('lastName', data.lastName);
    userData.append('email', data.email);
    userData.append('profileImage', data.profileImageUrl);
    userData.append('language', data.language);
    axios.patch(API.me, userData)
      .then(response => {
        if (response.data === 'OK') {
          window.location = '/profile'
        }
      })
      .catch(error => {
        return error.response && error.response.status === 409
          ? this.setState({ ErrorMail: "This email is already in use"})
          : this.setState({ ErrorMail: "Unknown error. Please try again"});
      });

    event.preventDefault();
  };

  SubmitPassword = (data) => {
    const userData = new FormData();
    userData.append('password', data.password);
    axios.patch(API.me, userData)
      .then(response => {
        if (response.data === 'OK') {
          window.location = '/profile'
        }
      })
      .catch(error => {
        return error.response && error.response.status === 404
          ? this.setState({ ErrorUserName: "Unknown error. Please try again"}) : '';
      });

    event.preventDefault();
  };

  render () {
    const { classes } = this.props;
    const value = { confirmPassword: "", password: ""};
    const { t, i18n } = this.props;

    return (
      <div className={classes.root}>
        <NavBar />
        <main className={classes.content} >
          <div className={classes.toolbar} />
          <Container fixed>
            <Typography variant="h5">
              {t("Dashboard")}
            </Typography>
            <Paper className={classes.paper} elevation={0}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  {this.state.me ?
                  <Typography variant="h6" component="h3" className={classes.welcome}>
                    Welcome back {this.state.me.username}!
                  </Typography>
                    : ""}
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
              {t("Settings Profile")}
            </Typography>
            <Grid container spacing={5}>
              {this.state.me ?
              <Grid item md={4}>
                <Formik
                  render={props => <FormInfos error={this.state.ErrorMail} onChange={this.onChange} {...props} />}
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

export default withTranslation()(withAuthSync(withStyles(styles)(Profile)));
