import TextField from "@material-ui/core/TextField";
import React from "react";
import {i18n} from '../../utils/i18n';

export const InputUserNameSigUp = (props, error = null) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  } = props;

  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="userName"
      label={i18n.t("UserName")}
      name="userName"
      autoComplete="uname"
      value={values.userName}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.userName ? i18n.t(errors.userName) : ''}
      error={touched.userName && Boolean(errors.userName) || Boolean(props.error === 'This username is already in use' ? props.error : '')}
    />
  )
};
