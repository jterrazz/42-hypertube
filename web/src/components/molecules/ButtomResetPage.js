import Grid from "@material-ui/core/Grid";
import React from "react";
import {LinkCustom} from "../atoms/LinkCustom";

export const ButtomResetPage = () => {
  return (
    <Grid container>
      <Grid item xs>
        <LinkCustom text="Already have an account? Sign in" href="/login"/>
      </Grid>
    </Grid>
  )
};
