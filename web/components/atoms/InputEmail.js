import TextField from "@material-ui/core/TextField";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const InputEmail = withTranslation()((props, error = null) => {
  const {
    values,
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
      id="email"
      label={props.t("Email Address")}
      name="email"
      autoComplete="email"
      value={values.email}
      onChange={e => {handleChange(e); props.onChange() }}
      onBlur={handleBlur}
      helperText={touched.email ? props.t(errors.email) : ''}
      error={touched.email && Boolean(errors.email) || Boolean(props.error === 'This email is already in use' || props.error === "\"email\" must be a valid email")}
    />
  )
});
