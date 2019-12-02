import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import { LabelRadio } from "../atoms/LabelRadio";

export const GroupRadioSort = (props) => {
  const [value, setValue] = React.useState('title');

  const handleChange = (ev) => {
    setValue(ev.target.value);
  };

  return (
    <Grid item md={4}>
      <FormControl component="fieldset">
        <RadioGroup value={value} aria-label="gender" className="RadioGroup" row onChange={e => {props.HandleChangeSort(e); handleChange(e)}}>
          <LabelRadio value="title" label="Title"/>
          <LabelRadio value="year" label="Year"/>
          <LabelRadio value="date_added" label="Date Added"/>
          <LabelRadio value="rating" label="Rating"/>
          <LabelRadio value="trending" label="Trending"/>
        </RadioGroup>
      </FormControl>
    </Grid>
  )
};
