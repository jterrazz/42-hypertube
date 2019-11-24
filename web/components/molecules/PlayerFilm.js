import React from "react";
import Player from "../atoms/Player";
import URL_Images from "../../utils/BasicImage";
import Grid from "@material-ui/core/Grid";

export const PlayerFilm = (props) => {
  return (
    <Grid>
      <Player
        hash_movie={props.hashMovie}
        thumbnail={props.movie.fanart_image !== 'https://image.tmdb.org/t/p/originalnull' ? props.movie.fanart_image : URL_Images.fanart}
        subtitles={props.subtitles}
        onStart={props.onStart}
      />
    </Grid>
  )
};
