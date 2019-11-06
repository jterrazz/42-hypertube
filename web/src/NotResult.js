import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import {useTranslation} from "react-i18next";

export const NotResult = (props, title) => {
  const [t, i18n] = useTranslation();
  return (
    <Grid container justify="center">
      <Typography variant="h4">
        0 {t("result matched")} `{props.title}`
      </Typography>
    </Grid>
  )
};
