import React from 'react'
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
import {withTranslation} from '../../utils/i18n';
import Container from "@material-ui/core/Container";

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
    marginTop: theme.spacing(5),
  },
  content: {
    flexGrow: 1,
  }
}));

export const Form = withTranslation()((props, {error = null}) => {
  const { handleSubmit } = props;
  const classes = useStyles();

  return (
  <main className={classes.content}>
    <Container fixed>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} elevation={1}>
          <div className={classes.paper}>
            <HeadLockPage text="Sign up"/>
            <form className={classes.form} onSubmit={handleSubmit}>
              <GroupButtonOauth />
              <DividerSplit />
              {props.error ? <BoxError text={props.t(props.error)}/> : ''}
              <Grid container justify="center" spacing={2}>
                <Grid container direction="column" justify="center" alignItems="center" item xs={6} sm={2}><InputImage {...props}/></Grid>
                <Grid item xs={12} sm={5}><InputFirstName {...props} /></Grid>
                <Grid item xs={12} sm={5}><InputLastName {...props}/></Grid>
              </Grid>
              <InputUserNameSigUp {...props} error={props.error} onChange={props.onChange}/>
              <InputEmail {...props} onChange={props.onChange} error={props.error}/>
              <InputPasswordSigUp {...props}/>
              <InputConfirmPasswordSigUp {...props} />
              <BoxReCaptcha {...props} setRefCaptcha={props.setRefCaptcha}/>
              <ButtonSubmit text="Sign up"/>
              <ButtomSigUpPage />
            </form>
          </div>
        </Grid>
        <ImageSplitPage />
      </Grid>
    </Container>
  </main>
  )
});
