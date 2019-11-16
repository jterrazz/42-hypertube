import TextField from "@material-ui/core/TextField";
import React from "react";
import {useTranslation} from "react-i18next";

export const InputPassword = (props, error = null, onChange) => {
  const {
    values: { password },
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
      name="password"
      label={t("Password")}
      type="password"
      id="password"
      autoComplete="current-password"
      value={password}
      onChange={e => {handleChange(e); props.onChange()}}
      onBlur={handleBlur}
      helperText={touched.password ? errors.password : ''}
      error={touched.password && Boolean(errors.password) || Boolean(props.error)}
    />
  )
};
