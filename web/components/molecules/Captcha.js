import Recaptcha from "react-google-recaptcha";
import { TypographyError } from "../atoms/TypographyError";
import React from "react";
import {i18n} from '../../utils/i18n';

// TODO Put in .env
export const Captcha = (props) => {
  const {
    touched,
    errors,
    setFieldValue } = props;
  return (
    <div>
      <Recaptcha
        ref={ref => (props.setRefCaptcha(ref))}
        name="reCaptcha"
        sitekey="6LeSqisUAAAAAJ9byufAwiGKahmH3F67vBwvN3E2"
        onChange={response => {
          setFieldValue('reCaptcha', response)
        }}
      />
      {errors.reCaptcha && touched.reCaptcha && (
        <TypographyError ErrorText={i18n.t(errors.reCaptcha)} />
      )}
    </div>
  )
};
