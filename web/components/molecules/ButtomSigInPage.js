import Grid from "@material-ui/core/Grid";
import React from "react";
import { LinkCustom } from "../atoms/LinkCustom";

export const ButtomSigInPage = () => {
  return (
    <Grid container>
      <Grid item xs>
        <LinkCustom text="Forgot password?" href="/forgot"/>
      </Grid>
      <Grid item>
        <LinkCustom text="Don't have an account? Sign Up" href="/signup"/>
      </Grid>
    </Grid>
  )
};
