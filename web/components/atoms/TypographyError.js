import Typography from "@material-ui/core/Typography";
import React from "react";
import {i18n} from '../../utils/i18n';

export const TypographyError = (props, ErrorText) => {
  return (
    <Typography variant="body2" style={{ color: 'red' }}>
      {i18n.t(props.ErrorText)}
    </Typography>
  )
};
