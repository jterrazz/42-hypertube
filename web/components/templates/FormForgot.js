import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
import { BoxError } from "../molecules/ErrorMessage";
import { ImageSplitPage } from "../atoms/ImageSplitPage";
import { InputUserName } from "../atoms/InputUserName";
import { HeadLockPage } from "../molecules/HeadLockPage";
import { ButtonSubmit } from "../atoms/ButtonSubmit";
import { ButtomResetPage } from "../molecules/ButtomResetPage";
import Container from "@material-ui/core/Container";

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

export const Form = (props) => {
  const { handleSubmit } = props;

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Container fixed>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} elevation={1}>
            <div className={classes.paper}>
              <HeadLockPage text="Forgot Your Password"/>
              <form className={classes.form} onSubmit={handleSubmit}>
                {props.error ? <BoxError text={props.error}/> : ''}
                <InputUserName {...props} onChange={props.onChange} error={props.error}/>
                <ButtonSubmit text="reset"/>
                <ButtomResetPage />
              </form>
            </div>
          </Grid>
          <ImageSplitPage />
        </Grid>
      </Container>
    </main>
  )
};
