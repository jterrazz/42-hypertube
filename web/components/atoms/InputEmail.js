import TextField from "@material-ui/core/TextField";
import React from "react";
import {i18n} from '../../utils/i18n';

export const InputEmail = (props, error = null) => {
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
      id="email"
      label={i18n.t("Email Address")}
      name="email"
      autoComplete="email"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.email ? i18n.t(errors.email) : ''}
      error={touched.email && Boolean(errors.email) || Boolean(props.error === 'This email is already in use' || props.error === "\"email\" must be a valid email" ? props.error : '')}
    />
  )
};
