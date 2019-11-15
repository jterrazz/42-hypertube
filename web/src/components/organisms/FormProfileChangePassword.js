import React from "react";
import { makeStyles } from "@material-ui/core";
import { InputPasswordSigUp } from "../atoms/InputPasswordSigUp";
import { InputConfirmPasswordSigUp } from "../atoms/InputConfirmPasswordSigUp";
import { ButtonSubmit } from "../atoms/ButtonSubmit";

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  }
}));

const FormPassword = props => {
  const { handleSubmit } = props;

  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <InputPasswordSigUp {...props} />
      <InputConfirmPasswordSigUp {...props} />
      <ButtonSubmit text="Change password"/>
    </form>
  );
};

export default FormPassword;
