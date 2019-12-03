import TextField from "@material-ui/core/TextField";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const InputFirstName = withTranslation()((props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,} = props;

  return (
    <TextField
      style={{ background: "white" }}
      autoComplete="fname"
      margin="normal"
      name="firstName"
      variant="outlined"
      required
      fullWidth
      id="firstName"
      label={props.t("First Name")}
      value={values.firstName || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.firstName ? props.t(errors.firstName) : ''}
      error={touched.firstName && Boolean(errors.firstName)}
    />
  )
});
