import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo'
import { withFormik, Field } from 'formik'
import * as Yup from 'yup'
import CustomImageInput from '../src/CustomImageInput'
import Recaptcha from 'react-recaptcha'
import axios from 'axios'
import API from '../src/API'
import Link from '../src/Link'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://intra.42.fr/">
        HyperTube
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

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
  divider: {
    margin: '20px',
  },
  button: {
    margin: theme.spacing(1),
  },
  BigAvatar: {
    width: 50,
    height: 50,
  },
}))

const signUpSide = props => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue } = props
  const classes = useStyles()

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container justify="center">
              <Grid item xs>
                <Button variant="contained" color="primary" className={classes.button} startIcon={<FacebookIcon />}>
                  Facebook
                </Button>
              </Grid>
              <Grid item xs>
                <Button variant="contained" color="primary" className={classes.button} startIcon={<TwitterIcon />}>
                  Twitter
                </Button>
              </Grid>

              <Grid item xs>
                <Button variant="contained" color="primary" className={classes.button} startIcon={<LinkedInIcon />}>
                  LinkedIn
                </Button>
              </Grid>

              <Grid item xs>
                <Button variant="contained" color="primary" className={classes.button} startIcon={<AccountBoxIcon />}>
                  Google
                </Button>
              </Grid>

              <Grid item xs>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<PersonalVideoIcon />}
                >
                  Intra_42
                </Button>
              </Grid>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <Grid container justify="center" spacing={2}>
              <Grid container direction="column" justify="center" alignItems="center" item xs={6} sm={2}>
                <Field
                  name="file"
                  component={CustomImageInput}
                  title="Select a file"
                  setFieldValue={setFieldValue}
                  errorMessage={errors['file'] ? errors['file'] : undefined}
                  touched={touched['file']}
                  style={{ display: 'flex' }}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  autoComplete="fname"
                  margin="normal"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.firstName ? errors.firstName : ''}
                  error={touched.firstName && Boolean(errors.firstName)}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.lastName ? errors.lastName : ''}
                  error={touched.lastName && Boolean(errors.lastName)}
                />
              </Grid>
            </Grid>
            <Grid>
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
            </Grid>
            <Grid>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.email ? errors.email : ''}
                error={touched.email && Boolean(errors.email)}
              />
            </Grid>
            <Grid>
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
            </Grid>
            <Grid>
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
            </Grid>
            <Grid>
              <Grid container justify="center">
                <div className="form-group">
                  <Recaptcha
                    name="recaptcha"
                    sitekey="6Lfdu7wUAAAAAMj_bppkQZ8kSLrcd_6Vv1P-xHgF"
                    render="explicit"
                    verifyCallback={response => {
                      setFieldValue('recaptcha', response)
                    }}
                  />
                  {errors.recaptcha && touched.recaptcha && (
                    <Typography variant="caption" color="error">
                      {errors.recaptcha}
                    </Typography>
                  )}
                </div>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot" variant="body2">
                  {'Forgot password?'}
                </Link>
              </Grid>
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
}

const FILE_SIZE = 1600 * 1024
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

const SignUpSide = withFormik({
  mapPropsToValues: ({ firstName, lastName, userName, email, password, confirmPassword, file, recaptcha }) => {
    return {
      firstName: firstName || '',
      lastName: lastName || '',
      userName: userName || '',
      email: email || '',
      password: password || '',
      confirmPassword: confirmPassword || '',
      file: file || '',
      recaptcha: recaptcha || '',
    }
  },

  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    userName: Yup.string()
      .required('Required')
      .strict()
      .trim('Spaces not allowed in UserName'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(3, 'Password must contain at least 8 characters')
      .required('Enter your password'),
    confirmPassword: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Password does not match'),
    // file: Yup.mixed()
    //   .required("A file is required")
    //   .test(
    //     "fileFormat",
    //     "Unsupported Format",
    //     value => value && SUPPORTED_FORMATS.includes(value.type)
    //   )
    //   .test(
    //     "fileSize",
    //     "File too large",
    //     value => value && value.size <= FILE_SIZE
    //   ),
    // recaptcha: Yup.string().required('Required'),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    event.preventDefault()

    const user = {
      name: {
        first: values.firstName,
        last: values.lastName,
      },
      username: values.userName,
      password: values.password,
      email: values.email,
    }

    const transport = axios.create({
      withCredentials: true,
    })

    transport
      .post(API.signup, user)
      .then(response => {
        if (response.data.message === 'Authentication successful') {
          window.location = '/home'
        }
      })
      .catch(error => {
        // if (error.response.status === 401){
        //   setSubmitting(false);
        // }
        console.log(error)
      })
  },
})(signUpSide)

export default SignUpSide
