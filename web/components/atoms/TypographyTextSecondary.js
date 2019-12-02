import Typography from "@material-ui/core/Typography";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const TypographyTextSecondary = withTranslation()((props, text) => {
  return (
    <Typography variant="body2" color="textSecondary">
      {props.t(props.text)}
    </Typography>
  )
});
