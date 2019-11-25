import Recaptcha from "react-recaptcha";
import { TypographyError } from "../atoms/TypographyError";
import React from "react";
import { useTranslation } from "react-i18next";

export const Captcha = (props) => {
  const {
    touched,
    errors,
    setFieldValue } = props;
  const [t] = useTranslation();
  return (
    <div>
      <Recaptcha
        name="reCaptcha"
        sitekey="6Lfdu7wUAAAAAMj_bppkQZ8kSLrcd_6Vv1P-xHgF"
        render="explicit"
        verifyCallback={response => {
          setFieldValue('reCaptcha', response)
        }}
      />
      {errors.reCaptcha && touched.reCaptcha && (
        <TypographyError ErrorText={t(errors.reCaptcha)} />
      )}
    </div>
  )
};
