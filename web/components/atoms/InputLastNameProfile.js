import TextField from "@material-ui/core/TextField";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const InputLastNameProfile = withTranslation()((props) => {
  const {
    values: {lastName},
    touched,
    errors,
    handleChange,
    handleBlur,} = props;

  return (
    <TextField
      style={{ background: "white" }}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="lastName"
      label={props.t("Last Name")}
      name="lastName"
      autoComplete="lname"
      value={lastName || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.lastName ? props.t(errors.lastName) : '' || Boolean(!lastName) ? props.t('Required') : ''}
      error={touched.lastName && Boolean(errors.lastName) || Boolean(!lastName)}
    />
  )
});
