import Grid from "@material-ui/core/Grid/Grid";
import React from "react";
import {Captcha} from "../molecules/Captcha";

export const BoxReCaptcha = (props) => {
  return (
    <Grid>
      <Grid container justify="center">
        <Captcha {...props}/>
      </Grid>
    </Grid>
  )
};
