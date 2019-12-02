import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { BoxError } from "../molecules/ErrorMessage";
import { HeadLockPage } from "../molecules/HeadLockPage"
import { ButtomSigInPage } from "../molecules/ButtomSigInPage"
import { InputUserName } from "../atoms/InputUserName"
import { InputPassword } from "../atoms/InputPassword"
import { ButtonSubmit } from "../atoms/ButtonSubmit";
import { ImageSplitPage } from "../atoms/ImageSplitPage";
import {withTranslation} from '../../utils/i18n';
import {GroupButtonOauth} from "../organisms/GroupButtonOauth";
import {DividerSplit} from "../atoms/DividerSplit";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(20, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: 10,
  },
  content: {
    flexGrow: 1,
  }
}));

export const Form = withTranslation()((props, error = null, onChange) => {
  const {
    handleSubmit,
  } = props;
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Container fixed>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} elevation={1}>
            <div className={classes.paper}>
              <HeadLockPage text="Sign in"/>
              <form className={classes.form} onSubmit={handleSubmit}>
                <GroupButtonOauth />
                <DividerSplit />
                {props.error ? <BoxError text={props.t(props.error)}/> : ''}
                <InputUserName {...props} onChange={props.onChange} error={props.error}/>
                <InputPassword {...props} onChange={props.onChange} error={props.error}/>
                <ButtonSubmit text="Sign in" className={classes.submit}/>
                <ButtomSigInPage />
              </form>
            </div>
          </Grid>

          <ImageSplitPage />

        </Grid>
      </Container>
    </main>
  );
});
