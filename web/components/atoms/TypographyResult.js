import Typography from "@material-ui/core/Typography";
import React from "react";
import {i18n} from '../../utils/i18n';

export const TypographyResult = (props, title) => {

  return (
    <Typography variant="h4">
      0 {i18n.t("result matched")} `{props.title}`
    </Typography>
  )
};
