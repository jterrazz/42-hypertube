import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {withTranslation} from '../../utils/i18n';

export const LabelRadio = withTranslation()((props) => {
  return (
    <FormControlLabel
      value={props.value}
      control={<Radio color="primary" />}
      label={i18n.t(props.label)}
      labelPlacement="start"
    />
  )
});
