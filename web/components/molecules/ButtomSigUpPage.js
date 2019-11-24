import Grid from "@material-ui/core/Grid";
import React from "react";
import {LinkCustom} from "../atoms/LinkCustom";

export const ButtomSigUpPage = () => {
  return (
    <Grid container>
      <Grid item xs>
        <LinkCustom text="Forgot password?" href="/forgot"/>
      </Grid>
      <Grid item>
        <LinkCustom text="Already have an account? Sign in" href="/login"/>
      </Grid>
    </Grid>
  )
};
