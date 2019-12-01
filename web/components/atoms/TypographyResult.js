import Typography from "@material-ui/core/Typography";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const TypographyResult = withTranslation()((props, title) => {

  return (
    <Typography variant="h4">
      0 {props.t("result matched")} `{props.title}`
    </Typography>
  )
});
