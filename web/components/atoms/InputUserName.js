import TextField from "@material-ui/core/TextField";
import React from "react";
import {useTranslation} from "react-i18next";

export const InputUserName = (props, error = null, onChange) => {
  const {
    values: { username },
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
      id="username"
      label={t("UserName")}
      name="username"
      autoComplete="username"
      value={username}
      onChange={e => {handleChange(e); props.onChange()}}
      onBlur={handleBlur}
      helperText={touched.username ? t(errors.username) : ''}
      error={touched.username && Boolean(errors.username) || Boolean(props.error)}
    />
  )
};
