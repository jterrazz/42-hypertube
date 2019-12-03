import TextField from "@material-ui/core/TextField";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const InputUserName = withTranslation()((props, error = null, onChange) => {
  const {
    values: { username },
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
      id="username"
      label={props.t("UserName")}
      name="username"
      autoComplete="username"
      value={username || ''}
      onChange={e => {handleChange(e); props.onChange()}}
      onBlur={handleBlur}
      helperText={touched.username ? props.t(errors.username) : ''}
      error={touched.username && Boolean(errors.username) || Boolean(props.error === 'This username is already in use' || props.error === "Wrong username/password" ? props.error : '')}
    />
  )
});
