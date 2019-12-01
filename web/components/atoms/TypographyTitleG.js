import Typography from "@material-ui/core/Typography";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const TypographyTitleG = withTranslation()((props, text) => {
  return (
    <Typography variant="h4">
      {props.t(props.text)}
    </Typography>
  )
});
