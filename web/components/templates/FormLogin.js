import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import { BoxError } from "../molecules/ErrorMessage";
import { HeadLockPage } from "../molecules/HeadLockPage"
import { ButtomSigInPage } from "../molecules/ButtomSigInPage"
import { InputUserName } from "../atoms/InputUserName"
import { InputPassword } from "../atoms/InputPassword"
import { ButtonSubmit } from "../atoms/ButtonSubmit";
import { ImageSplitPage } from "../atoms/ImageSplitPage";
import Copyright from "../atoms/Copyright";
import {useTranslation} from "react-i18next";

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
  submit: {
    margin: 10,
  }
}));

export const Form = (props, error = null, onChange) => {
  const {
    handleSubmit,
  } = props;
  const [t] = useTranslation();
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1} square>
        <div className={classes.paper}>
          <HeadLockPage text="Sign in"/>
          <form className={classes.form} onSubmit={handleSubmit}>
            {props.error ? <BoxError text={t(props.error)}/> : ''}
            <InputUserName {...props} onChange={props.onChange} error={props.error}/>
            <InputPassword {...props} onChange={props.onChange} error={props.error}/>
            <ButtonSubmit text="Sign in" className={classes.submit}/>
            <ButtomSigInPage />
          </form>
        </div>
        <Copyright />
      </Grid>
      <ImageSplitPage />
    </Grid>
  );
};
