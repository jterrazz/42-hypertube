import React from "react";
import { makeStyles } from "@material-ui/core";
import { BoxError } from "../molecules/ErrorMessage";
import { ButtonSubmit } from "../atoms/ButtonSubmit";
import { InputFirstName } from "../atoms/InputFirstName";
import { InputLastName } from "../atoms/InputLastName";
import { InputUpdateEmail } from "../atoms/InputUpdateEmail";
import { SelectLang } from "../molecules/SelectLang";
import {i18n} from '../../utils/i18n';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  }
}));

const FormInfos = (props) => {
  const { handleSubmit } = props;

  const classes = useStyles();
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {props.error ? <BoxError text={i18n.t(props.error)}/> : ''}
      <InputFirstName {...props} />
      <InputLastName {...props} />
      <InputUpdateEmail {...props} />
      <SelectLang {...props} />
      <ButtonSubmit text="save"/>
    </form>
  );
};

export default FormInfos;
