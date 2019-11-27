import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Formik} from "formik";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  paper_card: {
    padding: 10,
    background: "#F2F5F9"
  }
});

export const BoxFormik = (props) => {
  const classes = useStyles();
  return (
    <Grid item md={4}>
      <Paper className={classes.paper_card}>
        <Formik
          render={props.render}
          initialValues={props.initialValues}
          validationSchema={props.validationSchema}
          onSubmit={props.onSubmit}
        />
      </Paper>
    </Grid>
  )
};
