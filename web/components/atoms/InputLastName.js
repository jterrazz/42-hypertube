import TextField from "@material-ui/core/TextField";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const InputLastName = withTranslation()((props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,} = props;

  return (
    <TextField
      style={{ background: "white" }}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="lastName"
      label={props.t("Last Name")}
      name="lastName"
      autoComplete="lname"
      value={values.lastName || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.lastName ? props.t(errors.lastName) : ''}
      error={touched.lastName && Boolean(errors.lastName)}
    />
  )
});
