import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from 'react-i18next';

export const TypographyError = (props, ErrorText) => {
  const [t] = useTranslation();
  return (
    <Typography component="h1" variant="h5">
      {props.ErrorText}
    </Typography>
  )
};
