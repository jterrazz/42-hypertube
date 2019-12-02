import TextField from "@material-ui/core/TextField";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const InputConfirmPasswordSigUp = withTranslation()((props) => {
  const {
    values: {confirmPassword},
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
      label={props.t("Confirm Password")}
      id="confirmPassword"
      autoComplete="confirm-password"
      value={confirmPassword}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.confirmPassword ? props.t(errors.confirmPassword) : ''}
      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
    />
  )
});
