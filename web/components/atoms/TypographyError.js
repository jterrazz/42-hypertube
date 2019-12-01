import Typography from "@material-ui/core/Typography";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const TypographyError = withTranslation()((props, ErrorText) => {
  return (
    <Typography variant="body2" style={{ color: 'red' }}>
      {props.t(props.ErrorText)}
    </Typography>
  )
});
