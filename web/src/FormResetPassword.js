import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Avatar from "@material-ui/core/Avatar/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import Copyright from "./components/atoms/Copyright";
import {makeStyles} from "@material-ui/core";
import {useTranslation} from "react-i18next";

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

export const Form = props => {
  const {
    values: { password, confirmPassword },
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
  } = props;

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
            {t("Reset password")}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("Password")}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
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
              label={t("Confirm Password")}
              id="confirmPassword"
              autoComplete="confirm-password"
              value={confirmPassword}
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
              disabled={!isValid}
              className={classes.submit}
            >
              {t("reset")}
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
