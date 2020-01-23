import Grid from "@material-ui/core/Grid";
import React from "react";
import { TypographyTitleG } from "../atoms/TypographyTitleG";
import { CardCasting } from "./CardCasting";

export const Casting = (props) => {
  return (
    <Grid item xs={12} md={8}>
      {props.movie && props.movie.cast && props.movie.cast.length ?
        <>
          <TypographyTitleG text="Casting"/>
          <CardCasting {...props}/>
        </>
        : ''}
    </Grid>
  )
};
