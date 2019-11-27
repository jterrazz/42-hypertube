import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid'
import NavBar from "../components/organisms/NavBar";
import {Formik} from "formik";
import FormPassword from "../components/organisms/FormProfileChangePassword";
import FormInfos from "../components/organisms/FormProfileChangeInfos";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { CardProfile } from "../components/molecules/CardProfile";
import { TypographyTitle } from "../components/atoms/TypographyTitle";
import Copyright from "../components/atoms/Copyright";
import {fetchUserIfNeeded} from "../store/actions/auth";
import {connect} from "react-redux";
import matchaClient from '../services/matcha-api'
import {authentified} from "../wrappers/auth";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
  },
  main_profile: {
    backgroundColor: "#F6F4FC",
  },
  paper_card: {
    padding: 10,
    background: "#F2F5F9"
  }
});

const FILE_SIZE = 1600 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchemaPassword = Yup.object({
  password: Yup.string("")
    .min(8, "Password must contain at least 8 characters")
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
      .required('Email is required')
  });

const validationSchemaImage = Yup.object({
  profileImageUrl: Yup.mixed().notRequired()
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
});

class Profile extends Component {

  static async getInitialProps({ matchaClient, store }) {
    store.dispatch(fetchUserIfNeeded(matchaClient, true)) // TODO Force user update
    return {}
  }

  state = {
    ErrorMail: '',
    Error: ''
  };

  onChange = () => {
    this.setState({ ErrorMail: ""});
  };

  SubmitImage = (data) => {
    // TODO Replace by redux
    matchaClient.patchMe(data)
      .then()
      .catch(error => {
        this.setState({ Error: "Unknown error. Please try again"});
      })
  };

  SubmitInfos = (data) => {
    // i18next.changeLanguage(data.language); // TODO Replace by redux
    matchaClient.patchMe(data)
      .then()
      .catch(error => {
        return error.response && error.response.status === 409
          ? this.setState({ ErrorMail: "This email is already in use"})
          : this.setState({ ErrorMail: "Unknown error. Please try again"});
      })
  };

  SubmitPassword = (data) => {
    // TODO + check passwords are the same
    // TODO + error not printing
    matchaClient.patchMe(data)
      .then()
      .catch(error => {
        this.setState({ Error: "Unknown error. Please try again"});
      })
  };

  render () {
    const { classes } = this.props;
    const value = { confirmPassword: "", password: ""};
    const valueImage = { profileImageUrl: ""};

    const FormUpdateImage = dynamic(() => import("../components/molecules/FormUpdateImageProfile"));

    return (
      <div className={classes.root}>
        <NavBar />
        <main className={classes.content} >
          <div className={classes.toolbar} />
          <Container fixed>
            <TypographyTitle text="Dashboard"/>
            {this.props.me ? <CardProfile username={this.props.me.username}/> : ''}
            <TypographyTitle text="Settings Profile"/>
            <Grid container spacing={5} style={{ marginTop: 10 }}>
              <Grid item md={4}>
                <Paper className={classes.paper_card}>
                  <Formik
                    render={props => <FormUpdateImage error={this.props.Error} {...props} />}
                    initialValues={this.valueImage}
                    validationSchema={this.validationSchemaImage}
                    onSubmit={this.SubmitImage}
                  />
                </Paper>
              </Grid>
              {this.props.me ?
                <Grid item md={4}>
                  <Paper className={classes.paper_card}>
                    <Formik
                      render={props => <FormInfos error={this.props.ErrorMail} onChange={this.onChange} {...props} />}
                      initialValues={this.props.me}
                      validationSchema={this.validationSchemaInfos}
                      onSubmit={this.SubmitInfos}
                    />
                  </Paper>
                </Grid>
                : ''}
              <Grid item md={4}>
                <Paper className={classes.paper_card}>
                  <Formik
                    render={props => <FormPassword {...props} />}
                    initialValues={this.value}
                    validationSchema={this.validationSchemaPassword}
                    onSubmit={this.SubmitPassword}
                  />
                </Paper>
              </Grid>
            </Grid>

          </Container>
          <Copyright />
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  me: state.auth.user
})

export default authentified(true)(connect(mapStateToProps)(withStyles(styles)(Profile)));
