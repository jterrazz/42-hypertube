import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo'
import { Field } from 'formik'
import CustomImageInput from '../src/CustomImageInput'
import Recaptcha from 'react-recaptcha'
import Link from '../src/Link'
import Copyright from '../src/Copyright'
import {BoxError} from "./ErrorMessage";

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
}));

export const Form = (props, {error = null}) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue } = props;

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
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container justify="center">
              <Grid item xs>
                <Button variant="contained" color="primary" className={classes.button} startIcon={<FacebookIcon />} href="http://localhost:3000/auth/facebook">
                  Facebook
                </Button>
              </Grid>

              <Grid item xs>
                <Button variant="contained" color="primary" className={classes.button} startIcon={<LinkedInIcon />} href="http://localhost:3000/auth/linkedin">
                  LinkedIn
                </Button>
              </Grid>

              <Grid item xs>
                <Button variant="contained" color="primary" className={classes.button} startIcon={<AccountBoxIcon />} href="http://localhost:3000/auth/google">
                  Google
                </Button>
              </Grid>

              <Grid item xs>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<PersonalVideoIcon />}
                  href="http://localhost:3000/auth/42"
                >
                  Intra_42
                </Button>
              </Grid>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            {props.error ? <BoxError text={props.error}/> : ''}
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
                error={touched.userName && Boolean(errors.userName) || Boolean(props.error === 'This username is already in use' ? props.error : '')}
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
                error={touched.email && Boolean(errors.email) || Boolean(props.error === 'This email is already in use' || props.error === "\"email\" must be a valid email" ? props.error : '')}
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
                    name="reCaptcha"
                    sitekey="6Lfdu7wUAAAAAMj_bppkQZ8kSLrcd_6Vv1P-xHgF"
                    render="explicit"
                    verifyCallback={response => {
                      setFieldValue('reCaptcha', response)
                    }}
                  />
                  {errors.reCaptcha && touched.reCaptcha && (
                    <Typography variant="caption" color="error">
                      {errors.reCaptcha}
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
              // disabled={isSubmitting}
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
};
