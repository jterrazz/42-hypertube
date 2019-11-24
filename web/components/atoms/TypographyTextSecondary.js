import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from 'react-i18next';

export const TypographyTextSecondary = (props, text) => {
  const [t] = useTranslation();
  return (
    <Typography variant="body2" color="textSecondary">
      {t(props.text)}
    </Typography>
  )
};
