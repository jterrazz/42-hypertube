import React from "react";
import NavBar from "../organisms/NavBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { FilmDescription } from "../molecules/FilmDescription";
import { Casting } from "../molecules/Casting";
import { Comment } from "../molecules/Comment";
import CircularProgress from "../atoms/CircularProgress";
import { makeStyles } from "@material-ui/core";
import URL_Images from "../../utils/BasicImage";
import Player from "../atoms/Player";
import ApiURL from "../../config/ApiURL";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  }
}));

export const Play = (props, {movie = null, hashMovie = null, comment = null, subtitles = null, onStart}) => {
  const classes = useStyles();
  const url = `${ApiURL.movies_stream}${props.hashMovie}/stream`;

  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container fixed>
          {props.movie ?
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
            :
            <CircularProgress />
          }
        </Container>
      </main>
    </div>
  )
};
