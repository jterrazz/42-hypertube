import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const Loading = () => {
  return (
    <Grid
      container
      justify="center"
    >
      <Grid item>
        <CircularProgress/>
      </Grid>
    </Grid>
  )
};

export default Loading;
