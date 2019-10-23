import React, {Component} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import API from '../../src/API'
import Copyright from '../../src/Copyright'
import { login, withAuthSync } from '../../utils/auth'
import {withRouter} from "next/router";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const forgotPassword = (props, Submit) => {

  const { values, touched, errors, handleChange, handleBlur } = props;

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            RESET PASSWORD
          </Typography>
          <form className={classes.form} onSubmit={props.Submit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ''}
              error={touched.password && Boolean(errors.password)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              id="confirmPassword"
              autoComplete="confirm-password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmPassword ? errors.confirmPassword : ''}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              RESET PASSWORD
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
};

const ForgotPassword = withFormik({
  mapPropsToValues: ({ password, confirmPassword }) => {
    return {
      password: password || '',
      confirmPassword: confirmPassword || '',
    }
  },

  validationSchema: Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must contain at least 8 characters')
      .required('Enter your password'),
    confirmPassword: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Password does not match'),
  }),

  // handleSubmit: (values, { setSubmitting }) => {
  //   event.preventDefault();
  //
  //   const user = {
  //     password: values.password,
  //   };
  //
  //   const transport = axios.create({
  //     withCredentials: true
  //   });
  //
  //   transport.post(API.signin, user)
  //     .then(
  //       response => {
  //         if (response.data.message === 'Authentication successful') {
  //           const { token } = response.data;
  //           login ({ token });
  //         }
  //       })
  //     .catch(error => {
  //       if (error.response.status === 401){
  //         console.log(error);
  //         setSubmitting(false);
  //       }
  //     })
  // },
})(forgotPassword);

axios.defaults.withCredentials= true;

class Forgot extends Component {
  state = {
  };

  static async getInitialProps({req, query: { token }}) {
    return {
      token: token
    }
  }

  handleSubmit = ({ setSubmitting }) => {
    event.preventDefault();

    setSubmitting(false);

    const user = {
      token: this.props.token,
      password: values.password
    };

    const transport = axios.create({
      withCredentials: true
    });

    transport.post(API.reset_password, user)
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
    return (
      <ForgotPassword Submit={this.handleSubmit}/>
    )
  }
}

export default withRouter(Forgot);