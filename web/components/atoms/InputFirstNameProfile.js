import TextField from "@material-ui/core/TextField";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const InputFirstNameProfile = withTranslation()((props) => {
  const {
    values: {firstName},
    touched,
    errors,
    handleChange,
    handleBlur,} = props;

  return (
    <TextField
      style={{ background: "white" }}
      autoComplete="fname"
      margin="normal"
      name="firstName"
      variant="outlined"
      required
      fullWidth
      id="firstName"
      label={props.t("First Name")}
      value={firstName || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.firstName ? props.t(errors.firstName) : '' || Boolean(!firstName) ? props.t('Required') : ''}
      error={touched.firstName && Boolean(errors.firstName) || Boolean(!firstName)}
    />
  )
});
