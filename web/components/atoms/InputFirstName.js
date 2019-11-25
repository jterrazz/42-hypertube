import TextField from "@material-ui/core/TextField";
import React from "react";
import {useTranslation} from "react-i18next";

export const InputFirstName = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,} = props;

  const [t] = useTranslation();
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
      label={t("First Name")}
      value={values.firstName}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.firstName ? t(errors.firstName) : ''}
      error={touched.firstName && Boolean(errors.firstName)}
    />
  )
};
