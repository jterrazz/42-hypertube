import React, {Component} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '../src/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import axios from "axios"
import Copyright from '../src/Copyright'
import API from "../src/API";
import {login} from "../utils/auth";

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

const forgotPassword = props => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

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
            Forgot Your Password
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="UserName"
              name="userName"
              autoComplete="uname"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.userName ? errors.userName : ''}
              error={touched.userName && Boolean(errors.userName)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {'Already have an account? Sign in'}
                </Link>
              </Grid>
            </Grid>
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
  mapPropsToValues: ({ userName }) => {
    return {
      userName: userName || '',
    }
  },

  validationSchema: Yup.object().shape({
    userName: Yup.string()
      .required('Required')
      .strict()
      .trim('Spaces not allowed in UserName'),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    const transport = axios.create({
      withCredentials: true
    });

    transport.post(`${API.forgot}?username=${values.userName}`)
      .then(
        response => {
          if (response.data === 'OK') {
            window.location = "/"
          }
        })
      .catch(error => {
        console.log(error);
        setSubmitting(false);
      })
  },
})(forgotPassword);

axios.defaults.withCredentials = true;

class Forgot extends Component {

  state = {
  };

  render() {
    return (
      <ForgotPassword />
    )
  }
}

export default Forgot;
