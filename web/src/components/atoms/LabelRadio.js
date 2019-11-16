import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {useTranslation} from "react-i18next";

export const LabelRadio = (props) => {
  const [t] = useTranslation();
  return (
    <FormControlLabel
      value={props.value}
      control={<Radio color="primary" />}
      label={t(props.label)}
      labelPlacement="start"
    />
  )
};
