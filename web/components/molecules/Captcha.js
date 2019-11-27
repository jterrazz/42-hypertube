import Recaptcha from "react-google-recaptcha";

import { TypographyError } from "../atoms/TypographyError";
import React from "react";
import { useTranslation } from "react-i18next";

// TODO Put in .env
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
        sitekey="6LeSqisUAAAAAJ9byufAwiGKahmH3F67vBwvN3E2"
        onChange={response => {
          setFieldValue('reCaptcha', response)
        }}
      />
      {errors.reCaptcha && touched.reCaptcha && (
        <TypographyError ErrorText={t(errors.reCaptcha)} />
      )}
    </div>
  )
};
