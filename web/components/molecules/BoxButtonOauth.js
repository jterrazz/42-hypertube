import React from "react";
import Grid from '@material-ui/core/Grid'
import { ButtonOauth } from "../atoms/ButtonOauth";

export const BoxButtonOauth = (props) => {
  return (
    <Grid item xs>
      <ButtonOauth text={props.text} icon={props.icon} href={props.href}/>
    </Grid>
  )
};
