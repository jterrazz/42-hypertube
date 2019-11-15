import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import { ImageSplitPage } from "../atoms/ImageSplitPage";
import { HeadLockPage } from "../molecules/HeadLockPage";
import { InputPasswordSigUp } from "../atoms/InputPasswordSigUp";
import { InputConfirmPasswordSigUp } from "../atoms/InputConfirmPasswordSigUp";
import { ButtonSubmit } from "../atoms/ButtonSubmit";

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
  },
}));

export const Form = props => {
  const { handleSubmit } = props;

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <ImageSplitPage />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <HeadLockPage text="Reset password"/>
          <form className={classes.form} onSubmit={handleSubmit}>
            <InputPasswordSigUp {...props} />
            <InputConfirmPasswordSigUp {...props} />
            <ButtonSubmit text="reset"/>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
