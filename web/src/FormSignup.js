import React from 'react'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import { BoxError } from "./components/molecules/ErrorMessage";
import { useTranslation } from "react-i18next";
import { GroupButtonOauth } from "./components/organisms/GroupButtonOauth";
import { ImageSplitPage } from "./components/atoms/ImageSplitPage";
import { HeadLockPage } from "./components/molecules/HeadLockPage";
import { ButtomSigUpPage } from "./components/molecules/ButtomSigUpPage";
import { ButtonSubmit } from "./components/atoms/ButtonSubmit";
import { InputFirstName } from "./components/atoms/InputFirstName";
import { BoxReCaptcha } from "./components/organisms/BoxReCaptcha";
import { InputLastName } from "./components/atoms/InputLastName";
import { InputImage } from "./components/atoms/InputImage";
import { InputUserNameSigUp } from "./components/atoms/InputUserNameSigUp";
import { InputMail } from "./components/atoms/InputMail";
import {InputPasswordSigUp} from "./components/atoms/InputPasswordSigUp";
import {InputConfirmPasswordSigUp} from "./components/atoms/InputConfirmPasswordSigUp";

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
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    margin: '20px',
  },
}));

export const Form = (props, {error = null}) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit } = props;

  const classes = useStyles();
  const [t] = useTranslation();

  return (
    <Grid container component="main" className={classes.root}>
      <ImageSplitPage />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <HeadLockPage text="Sign up"/>
          <form className={classes.form} onSubmit={handleSubmit}>
            <GroupButtonOauth />
            <Divider variant="middle" className={classes.divider} />
            {props.error ? <BoxError text={props.error}/> : ''}
            <Grid container justify="center" spacing={2}>

              <Grid container direction="column" justify="center" alignItems="center" item xs={6} sm={2}>
                <InputImage {...props}/>
              </Grid>

              <Grid item xs={12} sm={5}>
                <InputFirstName {...props} />
              </Grid>

              <Grid item xs={12} sm={5}>
                <InputLastName {...props}/>
              </Grid>

            </Grid>
            <Grid>
              <InputUserNameSigUp {...props} error={props.error}/>
            </Grid>
            <Grid>
              <InputMail {...props} error={props.error}/>
            </Grid>
            <Grid>
              <InputPasswordSigUp {...props}/>
            </Grid>
            <Grid>
              <InputConfirmPasswordSigUp {...props} />
            </Grid>
            <BoxReCaptcha {...props}/>
            <ButtonSubmit text="Sign up"/>
            <ButtomSigUpPage />
          </form>
        </div>
      </Grid>
    </Grid>
  )
};
