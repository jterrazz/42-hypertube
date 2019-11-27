import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid'
import axios from "axios";
import NavBar from "../components/organisms/NavBar";
import { withAuthSync } from '../utils/auth'
import {Formik} from "formik";
import FormPassword from "../components/organisms/FormProfileChangePassword";
import FormInfos from "../components/organisms/FormProfileChangeInfos";
import * as Yup from "yup";
import {withTranslation} from "react-i18next";
import i18next from "i18next";
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

axios.defaults.withCredentials = true;

class Profile extends Component {

  // static async getInitialProps({ query: { hash, id }, matchaClient, store }) {
    // store.dispatch(fetchUserIfNeeded(matchaClient)) // TODO Force user update
    // return {}
  // }

  state = {
    ErrorMail: '',
    Error: ''
  };

  // async componentDidMount() {
  //   const response = await axios.get(ApiURL.me);
  //   const responseData = await response.data;
  //   this.setState({ me: responseData })
  // }

  onChange = () => {
    this.setState({ ErrorMail: ""});
  };

  SubmitImage = (data) => {
    matchaClient.patchMe(data)
      .then()
      .catch(error => {
        this.setState({ Error: "Unknown error. Please try again"});
      })
  };

  SubmitInfos = (data) => {
    // i18next.changeLanguage(data.language); // TODO Replace by vuex
    matchaClient.patchMe(data)
      .then()
      .catch(error => {
        return error.response && error.response.status === 409
          ? this.setState({ ErrorMail: "This email is already in use"})
          : this.setState({ ErrorMail: "Unknown error. Please try again"});
      })
  };

  SubmitPassword = (data) => {
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
// export default withTranslation()(withAuthSync(withStyles(styles)(connect(mapStateToProps)(Profile))));
