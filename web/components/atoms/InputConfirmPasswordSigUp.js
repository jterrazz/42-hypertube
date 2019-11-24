import TextField from "@material-ui/core/TextField";
import React from "react";
import {useTranslation} from "react-i18next";

export const InputConfirmPasswordSigUp = (props) => {
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
      name="confirmPassword"
      type="password"
      label={t("Confirm Password")}
      id="confirmPassword"
      autoComplete="confirm-password"
      value={values.confirmPassword}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.confirmPassword ? errors.confirmPassword : ''}
      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
    />
  )
};
