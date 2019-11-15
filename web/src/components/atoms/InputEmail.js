import TextField from "@material-ui/core/TextField/TextField";
import React from "react";
import {useTranslation} from "react-i18next";

export const InputEmail = (props, error = null) => {
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
      id="email"
      label={t("Email Address")}
      name="email"
      autoComplete="email"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.email ? errors.email : ''}
      error={touched.email && Boolean(errors.email) || Boolean(props.error === 'This email is already in use' || props.error === "\"email\" must be a valid email" ? props.error : '')}
    />
  )
};
