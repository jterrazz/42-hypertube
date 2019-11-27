import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { BoxError } from "../molecules/ErrorMessage";
import { GroupButtonOauth } from "../organisms/GroupButtonOauth";
import { ImageSplitPage } from "../atoms/ImageSplitPage";
import { HeadLockPage } from "../molecules/HeadLockPage";
import { ButtomSigUpPage } from "../molecules/ButtomSigUpPage";
import { ButtonSubmit } from "../atoms/ButtonSubmit";
import { InputFirstName } from "../atoms/InputFirstName";
import { BoxReCaptcha } from "../organisms/BoxReCaptcha";
import { InputLastName } from "../atoms/InputLastName";
import { InputImage } from "../atoms/InputImage";
import { InputUserNameSigUp } from "../atoms/InputUserNameSigUp";
import { InputEmail } from "../atoms/InputEmail";
import { InputPasswordSigUp } from "../atoms/InputPasswordSigUp";
import { InputConfirmPasswordSigUp } from "../atoms/InputConfirmPasswordSigUp";
import { DividerSplit } from "../atoms/DividerSplit";
import Copyright from "../atoms/Copyright";
import {i18n} from '../../utils/i18n';

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

export const Form = (props, {error = null}) => {
  const { handleSubmit } = props;
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1} square>
        <div className={classes.paper}>
          <HeadLockPage text="Sign up"/>
          <form className={classes.form} onSubmit={handleSubmit}>
            <GroupButtonOauth />
            <DividerSplit />
            {props.error ? <BoxError text={i18n.t(props.error)}/> : ''}
            <Grid container justify="center" spacing={2}>
              <Grid container direction="column" justify="center" alignItems="center" item xs={6} sm={2}><InputImage {...props}/></Grid>
              <Grid item xs={12} sm={5}><InputFirstName {...props} /></Grid>
              <Grid item xs={12} sm={5}><InputLastName {...props}/></Grid>
            </Grid>
            <InputUserNameSigUp {...props} error={props.error}/>
            <InputEmail {...props} error={props.error}/>
            <InputPasswordSigUp {...props}/>
            <InputConfirmPasswordSigUp {...props} />
            <BoxReCaptcha {...props}/>
            <ButtonSubmit text="Sign up"/>
            <ButtomSigUpPage />
          </form>
        </div>
        <Copyright />
      </Grid>
      <ImageSplitPage />
    </Grid>
  )
};
