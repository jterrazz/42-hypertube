import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
}));

export const LockOutlined = () => {
  const classes = useStyles();
  return (
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
  )
};
