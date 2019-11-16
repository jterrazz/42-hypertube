import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from 'react-i18next';

export const TypographyTitleG = (props, text) => {
  const [t] = useTranslation();
  return (
    <Typography variant="h4">
      {t(props.text)}
    </Typography>
  )
};
