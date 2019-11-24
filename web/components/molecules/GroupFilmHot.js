import React from "react";
import Grid from "@material-ui/core/Grid";
import { TypographyTitle } from "../atoms/TypographyTitle";
import { CardPosterFilm } from "./CardPosterFilm";

export const GroupFilmHot = (props) => {
  return (
    <>
      <TypographyTitle text={props.text}/>
      <Grid container spacing={4} style={{marginTop: 15}}>
        {props.movie[props.source].slice(0, 6).map((item, index) => (
          <CardPosterFilm key={index} {...item}/>
        ))}
      </Grid>
    </>
  )
};
