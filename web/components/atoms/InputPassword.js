import TextField from "@material-ui/core/TextField";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const InputPassword = withTranslation()((props, error = null, onChange) => {
  const {
    values: { password },
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
      name="password"
      label={props.t("Password")}
      type="password"
      id="password"
      autoComplete="current-password"
      value={password}
      onChange={e => {handleChange(e); props.onChange()}}
      onBlur={handleBlur}
      helperText={touched.password ? props.t(errors.password) : ''}
      error={touched.password && Boolean(errors.password) || Boolean(props.error)}
    />
  )
});
