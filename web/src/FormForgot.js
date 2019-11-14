import React from 'react'
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
import Copyright from './components/atoms/Copyright'
import {BoxError} from "./components/molecules/ErrorMessage";
import { useTranslation } from 'react-i18next';

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

export const Form = (props, {error = null, onChange}) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;

  const classes = useStyles();

  const [t, i18n] = useTranslation();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("Forgot Your Password")}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {props.error ? <BoxError text={props.error}/> : ''}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label={t("UserName")}
              name="userName"
              autoComplete="uname"
              value={values.userName}
              onChange={e => {handleChange(e); props.onChange()}}
              onBlur={handleBlur}
              helperText={touched.userName ? errors.userName : ''}
              error={touched.userName && Boolean(errors.userName) || Boolean(props.error)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("reset")}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {t('Already have an account? Sign in')}
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
