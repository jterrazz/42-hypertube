import Typography from "@material-ui/core/Typography";
import React from "react";
import {i18n} from '../../utils/i18n';

export const TypographyTitleG = (props, text) => {
  return (
    <Typography variant="h4">
      {i18n.t(props.text)}
    </Typography>
  )
};
