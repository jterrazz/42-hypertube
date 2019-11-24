import CustomImageInput from "../molecules/CustomImageInput";
import {Field} from "formik";
import React from "react";
import {useTranslation} from "react-i18next";

export const InputImage = (props) => {
  const {
    touched,
    errors,
    handleBlur,
    setFieldValue } = props;

  const [t] = useTranslation();
  return (
    <Field
      name="file"
      component={CustomImageInput}
      title="Select a file"
      setFieldValue={setFieldValue}
      errorMessage={errors['file'] ? errors['file'] : undefined}
      touched={touched['file']}
      style={{ display: 'flex' }}
      onBlur={handleBlur}
    />
  )
};
