import React from "react";
import { makeStyles } from "@material-ui/core";
import { BoxError } from "../molecules/ErrorMessage";
import { ButtonSubmit } from "../atoms/ButtonSubmit";
import { InputFirstNameProfile } from "../atoms/InputFirstNameProfile";
import { InputLastNameProfile } from "../atoms/InputLastNameProfile";
import { InputUpdateEmail } from "../atoms/InputUpdateEmail";
import { SelectLang } from "../molecules/SelectLang";
import {withTranslation} from '../../utils/i18n';
import {InputUserNameProfile} from "../atoms/InputUserNameProfile";

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
      <InputUserNameProfile {...props}/>
      <InputFirstNameProfile {...props} />
      <InputLastNameProfile {...props} />
      <InputUpdateEmail {...props} onChange={props.onChange} />
      <SelectLang {...props} />
      <ButtonSubmit text="save"/>
    </form>
  );
};

export default withTranslation()(FormInfos);
