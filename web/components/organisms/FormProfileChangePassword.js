import React from "react";
import { makeStyles } from "@material-ui/core";
import { InputPassword } from "../atoms/InputPassword";
import { InputConfirmPasswordSigUp } from "../atoms/InputConfirmPasswordSigUp";
import { ButtonSubmit } from "../atoms/ButtonSubmit";
import {BoxError} from "../molecules/ErrorMessage";
import {BoxInfo} from "../molecules/InfoMessage";
import {withTranslation} from "../../utils/i18n";

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  }
}));

const FormPassword = withTranslation()((props) => {
  const { handleSubmit } = props;

  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {props.error ? <BoxError text={props.t(props.error)}/> : ''}
      {props.info ? <BoxInfo text={props.t(props.info)}/> : ''}
      <InputPassword {...props} onChange={props.onChange} />
      <InputConfirmPasswordSigUp {...props} />
      <ButtonSubmit text="Change password"/>
    </form>
  );
});

export default FormPassword;
