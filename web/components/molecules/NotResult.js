import Grid from "@material-ui/core/Grid/Grid";
import React from "react";
import {TypographyResult} from "../atoms/TypographyResult";


export const NotResult = (props) => {
  return (
    <Grid container justify="center">
      <TypographyResult title={props.title}/>
    </Grid>
  )
};
