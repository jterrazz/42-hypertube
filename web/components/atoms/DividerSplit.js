import React from "react";
import {makeStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  divider: {
    margin: '20px',
  },
});

export const DividerSplit = () => {
  const classes = useStyles();
  return (
    <Divider variant="middle" className={classes.divider} />
  )
};
