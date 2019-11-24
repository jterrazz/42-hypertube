import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from '@material-ui/core/Switch';

export const GroupRadioReverse = (props) => {

  return (
    <Grid item md={4}>
      <FormControlLabel control={<Switch value="checked" color="primary" onChange={props.HandleChangeReverse}/>} label="Reverse"/>
    </Grid>
  )
};
