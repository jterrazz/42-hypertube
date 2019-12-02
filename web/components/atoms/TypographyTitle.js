import Typography from "@material-ui/core/Typography";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const TypographyTitle = withTranslation()((props) => {
  return (
    <Typography component="h1" variant="h5">
      {props.t(props.text)}
    </Typography>
  )
});
