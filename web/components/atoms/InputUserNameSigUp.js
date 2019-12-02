import TextField from "@material-ui/core/TextField";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const InputUserNameSigUp = withTranslation()((props, error = null) => {
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
      id="userName"
      label={props.t("UserName")}
      name="userName"
      autoComplete="uname"
      value={values.userName}
      onChange={e => {handleChange(e); props.onChange()}}
      onBlur={handleBlur}
      helperText={touched.userName ? props.t(errors.userName) : ''}
      error={touched.userName && Boolean(errors.userName) || Boolean(props.error === 'This username is already in use' ? props.error : '')}
    />
  )
});
