import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { FilmDescription } from "../molecules/FilmDescription";
import { Casting } from "../molecules/Casting";
import { Comment } from "../molecules/Comment";
import CircularProgress from "../atoms/CircularProgress";
import { makeStyles } from "@material-ui/core";
import URL_Images from "../../services/online-assets";
import Player from "../atoms/Player";
import { getStreamURL } from '../../services/matcha-api'
import {Error404} from "../molecules/Error404";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  }
}));

export const Play = (props, {movie = null, hashMovie = null, comment = null, subtitles = null, onStart}) => {
  const classes = useStyles();
  const url = getStreamURL(props.hashMovie);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      {props.movie ?
        <Container fixed>
          <>
            <Player
              url={url}
              thumbnail={props.movie.fanart_image !== 'https://image.tmdb.org/t/p/originalnull' ? props.movie.fanart_image : URL_Images.fanart}
              subtitles={props.subtitles}
              onStart={props.onStart}
            />
            <Grid container spacing={3} style={{marginTop: 10}}>
              <FilmDescription {...props}/>
              <Casting {...props}/>
              <Comment {...props}/>
            </Grid>
          </>
        </Container>
        :
        <Error404 />
      }
    </main>
  )
};
