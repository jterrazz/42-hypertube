import TextField from "@material-ui/core/TextField";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const InputUpdateEmail = withTranslation()((props, error = null, onChange) => {
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
      id="email"
      label={props.t("Email Address")}
      name="email"
      autoComplete="email"
      value={values.email || ''}
      onChange={e => {handleChange(e); props.onChange()}}
      onBlur={handleBlur}
      helperText={touched.email ? props.t(errors.email) : ''}
      error={touched.email && Boolean(errors.email) || Boolean(props.error === 'This email is already in use' ? props.error : '')}
    />
  )
});
