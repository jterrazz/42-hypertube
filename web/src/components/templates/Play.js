import React from "react";
import NavBar from "../organisms/NavBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { FilmDescription } from "../molecules/FilmDescription";
import { PlayerFilm } from "../molecules/PlayerFilm";
import { Casting } from "../molecules/Casting";
import { Comment } from "../molecules/Comment";
import CircularProgress from "../atoms/CircularProgress";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  }
}));

export const Play = (props, {movie = null, hashMovie = null, comment = null, subtitles = null}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container fixed>

          {props.movie ?
            <>
              <PlayerFilm {...props}/>
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
