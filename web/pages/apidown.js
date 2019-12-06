import React from "react";
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core";
import Copyright from "../components/atoms/Copyright";

const useStyles = makeStyles({
  content: {
    flexGrow: 1,
  }
});

const ErrorPageApi = () => {
  const classes = useStyles();
  return (
    <>
      <main className={classes.content}>
        <Container fixed>
          <Grid container>
          <Grid container direction="row" justify="center" alignItems="center">
              <img alt="api_down" src="../static/images/apidown.png"/>
          </Grid>
          </Grid>
        </Container>
      </main>
      <div>
        <Copyright />
      </div>
    </>
  )
};

ErrorPageApi.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default ErrorPageApi;
