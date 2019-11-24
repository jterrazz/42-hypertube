import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import { LabelRadio } from "../atoms/LabelRadio";

export const GroupRadioSource = (props) => {
  const [value, setValue] = React.useState('title');

  const handleChangeReset = () => {
    setValue('title');
  };

  return (
    <Grid item md={4}>
      <FormControl component="fieldset">
        <RadioGroup defaultValue="popcorn" aria-label="gender" name="customized-radios" row onChange={e => {props.HandleChangeSource(e); handleChangeReset(e)}}>
          <LabelRadio value="popcorn" label="Popcorn"/>
          <LabelRadio value="yts" label="Yts"/>
        </RadioGroup>
      </FormControl>
    </Grid>
  )
};
