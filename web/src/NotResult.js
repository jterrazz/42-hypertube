import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";

export const NotResult = (props, title) => {
  return (
    <Grid container justify="center">
      <Typography variant="h4">
        0 result matched `{props.title}`
      </Typography>
    </Grid>
  )
};
