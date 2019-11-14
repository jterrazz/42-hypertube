import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import {useTranslation} from "react-i18next";

export const TypographyResult = (props, title) => {
  const [t] = useTranslation();
  return (
    <Typography variant="h4">
      0 {t("result matched")} `{props.title}`
    </Typography>
  )
};
