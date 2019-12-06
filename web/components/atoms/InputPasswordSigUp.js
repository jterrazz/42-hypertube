import TextField from "@material-ui/core/TextField";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const InputPasswordSigUp = withTranslation()((props) => {
  const {
    values: {password},
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
      name="password"
      label={props.t("Password")}
      type="password"
      id="password"
      autoComplete="current-password"
      value={password}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.password ? props.t(errors.password) : ''}
      error={touched.password && Boolean(errors.password)}
    />
  )
});
