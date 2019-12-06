import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { TypographyTitle } from "../atoms/TypographyTitle";
import { TypographyTextSecondary } from "../atoms/TypographyTextSecondary";
import { CardFanartFilm } from "../molecules/CardFanartFilm";
import { GroupFilmHot } from "../molecules/GroupFilmHot";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "../atoms/CircularProgress";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  }
}));

export const Home = (props) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      {props.movie && props.movie.popcorn && props.movie.yts ?
        <Container fixed>
          <TypographyTitle text="Featured"/>
          <TypographyTextSecondary text="Discover our best picks"/>

          <Grid container spacing={5} style={{marginTop: 15}}>
            {props.firstHotPopcorn ? <CardFanartFilm film={props.firstHotPopcorn}/> : "" }
            {props.firstHotYts ? <CardFanartFilm film={props.firstHotYts}/> : "" }
          </Grid>

          <GroupFilmHot {...props} text="Yts" source="yts"/>
          <GroupFilmHot {...props} text="Popcorn" source="popcorn"/>

        </Container>
        :
        <CircularProgress/>
      }

    </main>
  )
};
