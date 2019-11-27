import TextField from "@material-ui/core/TextField";
import React from "react";
import {i18n} from '../../utils/i18n';

export const InputFirstName = (props) => {
  const {
    values,
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
      label={i18n.t("First Name")}
      value={values.firstName}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.firstName ? i18n.t(errors.firstName) : ''}
      error={touched.firstName && Boolean(errors.firstName)}
    />
  )
};
