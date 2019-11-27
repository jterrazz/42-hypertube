import Typography from "@material-ui/core/Typography";
import React from "react";
import {i18n} from '../../utils/i18n';

export const TypographyTextSecondary = (props, text) => {
  return (
    <Typography variant="body2" color="textSecondary">
      {i18n.t(props.text)}
    </Typography>
  )
};
