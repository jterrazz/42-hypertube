import TextField from "@material-ui/core/TextField";
import React from "react";
import {useTranslation} from "react-i18next";

export const InputUpdateEmail = (props, error = null) => {
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
      style={{ background: "white" }}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label={t("Email Address")}
      name="email"
      autoComplete="email"
      value={values.email}
      onChange={e => {handleChange(e); props.onChange()}}
      onBlur={handleBlur}
      helperText={touched.email ? errors.email : ''}
      error={touched.email && Boolean(errors.email) || Boolean(props.error)}
    />
  )
};
