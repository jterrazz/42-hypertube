import Button from "@material-ui/core/Button";
import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export const ButtonOauth = (props) => {
  const classes = useStyles();
  return (
    <Button variant="contained" color="primary" className={classes.button} startIcon={props.icon} href={props.href}>
      {props.text}
    </Button>
  )
};
