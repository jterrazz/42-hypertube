import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Copyright from "../atoms/Copyright";
import { makeStyles } from '@material-ui/core/styles'
import { BoxError } from "../molecules/ErrorMessage";
import { ImageSplitPage } from "../atoms/ImageSplitPage";
import { InputUserName } from "../atoms/InputUserName";
import { HeadLockPage } from "../molecules/HeadLockPage";
import { ButtonSubmit } from "../atoms/ButtonSubmit";
import { ButtomResetPage } from "../molecules/ButtomResetPage";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  }
}));

export const Form = (props, {error = null, onChange}) => {
  const { handleSubmit } = props;

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <ImageSplitPage />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <HeadLockPage text="Forgot Your Password"/>
          <form className={classes.form} onSubmit={handleSubmit}>
            {props.error ? <BoxError text={props.error}/> : ''}
            <InputUserName {...props} onChange={props.onChange} error={props.error}/>
            <ButtonSubmit text="reset"/>
            <ButtomResetPage />
          </form>
        </div>
        <Copyright />
      </Grid>
    </Grid>
  )
};
