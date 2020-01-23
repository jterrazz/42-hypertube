import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { ImageSplitPage } from "../atoms/ImageSplitPage";
import { HeadLockPage } from "../molecules/HeadLockPage";
import { InputPasswordSigUp } from "../atoms/InputPasswordSigUp";
import { InputConfirmPasswordSigUp } from "../atoms/InputConfirmPasswordSigUp";
import { ButtonSubmit } from "../atoms/ButtonSubmit";
import Container from "@material-ui/core/Container";
import {BoxError} from "../molecules/ErrorMessage";
import {Error404} from "../molecules/Error404";

const useStyles = makeStyles(theme => ({
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
  content: {
    flexGrow: 1,
  }
}));

export const Form = props => {
  const { handleSubmit } = props;
  const classes = useStyles();
  return (
    <main className={classes.content}>
      {!props.errorToken ?
        <Container fixed>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} elevation={1}>
              <div className={classes.paper}>
                <HeadLockPage text="Reset password"/>
                <form className={classes.form} onSubmit={handleSubmit}>
                  {props.error ? <BoxError text={props.error}/> : ''}
                  <InputPasswordSigUp {...props} />
                  <InputConfirmPasswordSigUp {...props} />
                  <ButtonSubmit text="reset"/>
                </form>
              </div>
            </Grid>
            <ImageSplitPage />
          </Grid>
        </Container>
        :
        <Error404 />
      }
    </main>
  );
};
