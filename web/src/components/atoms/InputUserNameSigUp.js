import TextField from "@material-ui/core/TextField/TextField";
import React from "react";
import {useTranslation} from "react-i18next";

export const InputUserNameSigUp = (props, error = null) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  } = props;

  const [t] = useTranslation();
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="userName"
      label={t("UserName")}
      name="userName"
      autoComplete="uname"
      value={values.userName}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.userName ? errors.userName : ''}
      error={touched.userName && Boolean(errors.userName) || Boolean(props.error === 'This username is already in use' ? props.error : '')}
    />
  )
};
