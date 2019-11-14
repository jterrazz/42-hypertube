import TextField from "@material-ui/core/TextField/TextField";
import React from "react";
import {useTranslation} from "react-i18next";

export const InputLastName = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,} = props;

  const [t] = useTranslation();
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="lastName"
      label={t("Last Name")}
      name="lastName"
      autoComplete="lname"
      value={values.lastName}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.lastName ? errors.lastName : ''}
      error={touched.lastName && Boolean(errors.lastName)}
    />
  )
};
