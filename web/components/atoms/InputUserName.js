import TextField from "@material-ui/core/TextField";
import React from "react";
import {i18n} from '../../utils/i18n';

export const InputUserName = (props, error = null, onChange) => {
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
      label={i18n.t("UserName")}
      name="username"
      autoComplete="username"
      value={username}
      onChange={e => {handleChange(e); props.onChange()}}
      onBlur={handleBlur}
      helperText={touched.username ? i18n.t(errors.username) : ''}
      error={touched.username && Boolean(errors.username) || Boolean(props.error === 'This username is already in use' ? props.error : '')}
    />
  )
};
