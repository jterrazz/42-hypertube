import Recaptcha from "react-google-recaptcha";
import { TypographyError } from "../atoms/TypographyError";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const Captcha = withTranslation()((props) => {
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
        <TypographyError ErrorText={props.t(errors.reCaptcha)} />
      )}
    </div>
  )
});
