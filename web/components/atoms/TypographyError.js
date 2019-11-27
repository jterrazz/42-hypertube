import Typography from "@material-ui/core/Typography";
import React from "react";
import {i18n} from '../../utils/i18n';

export const TypographyError = (props, ErrorText) => {
  return (
    <Typography component="h1" variant="h5">
      {i18n.t(props.ErrorText)}
    </Typography>
  )
};
