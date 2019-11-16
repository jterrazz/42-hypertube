import TextField from "@material-ui/core/TextField";
import React from "react";
import { useTranslation } from "react-i18next";

export const InputPasswordSigUp = (props) => {
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
      name="password"
      label={t("Password")}
      type="password"
      id="password"
      autoComplete="current-password"
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.password ? errors.password : ''}
      error={touched.password && Boolean(errors.password)}
    />
  )
};
