import React from "react";
import { makeStyles } from "@material-ui/core";
import { BoxError } from "../molecules/ErrorMessage";
import { ButtonSubmit } from "../atoms/ButtonSubmit";
import { InputFirstName } from "../atoms/InputFirstName";
import { InputLastName } from "../atoms/InputLastName";
import { InputUpdateEmail } from "../atoms/InputUpdateEmail";
import { SelectLang } from "../molecules/SelectLang";
import {withTranslation} from '../../utils/i18n';
import {InputUserName} from "../atoms/InputUserName";

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
      {props.error ? <BoxError text={props.t(props.error)}/> : ''}
      <InputUserName {...props}/>
      <InputFirstName {...props} />
      <InputLastName {...props} />
      <InputUpdateEmail {...props} onChange={props.onChange} />
      <SelectLang {...props} />
      <ButtonSubmit text="save"/>
    </form>
  );
};

export default withTranslation()(FormInfos);
