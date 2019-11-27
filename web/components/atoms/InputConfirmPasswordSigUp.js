import TextField from "@material-ui/core/TextField";
import React from "react";
import {i18n} from '../../utils/i18n';

export const InputConfirmPasswordSigUp = (props) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  } = props;

  return (
    <TextField
      style={{ background: "white" }}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="confirmPassword"
      type="password"
      label={i18n.t("Confirm Password")}
      id="confirmPassword"
      autoComplete="confirm-password"
      value={values.confirmPassword}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.confirmPassword ? t(errors.confirmPassword) : ''}
      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
    />
  )
};
