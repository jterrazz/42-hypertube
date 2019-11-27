import CustomImageInput from "../molecules/CustomImageInput";
import {Field} from "formik";
import React from "react";
import {i18n} from '../../utils/i18n';

export const InputImage = (props) => {
  const {
    touched,
    errors,
    handleBlur,
    setFieldValue } = props;

  return (
    <Field
      name="file"
      component={CustomImageInput}
      title="Select a file"
      setFieldValue={setFieldValue}
      errorMessage={errors['file'] ? i18n.t(errors['file']) : undefined}
      touched={touched['file']}
      style={{ display: 'flex' }}
      onBlur={handleBlur}
    />
  )
};
