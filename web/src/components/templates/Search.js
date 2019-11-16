import React from "react";
import NavBar from "../organisms/NavBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LazyLoad from "react-lazyload";
import CircularProgress from "../atoms/CircularProgress";
import { InputSearch } from "../atoms/InputSearch";
import { GroupRadioSource } from "../molecules/GroupRadioSource";
import { GroupRadioSort } from "../molecules/GroupRadioSort";
import { CardPosterFilm } from "../molecules/CardPosterFilm";
import { NotResult } from "../molecules/NotResult";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  searchInput: {
    fontSize: 32
  },
  img: {
    borderRadius: 5,
    height: 250,
  },
  card: {
    maxWidth: 300,
  },
  subtitle: {
    margin: theme.spacing(0.5),
  },
  RadioGroup: {
    flexDirection: "row",
  }
}));

export const Search = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content} >
        <div className={classes.toolbar} />
        <Container fixed>
          <InputSearch {...props}/>
          <Grid container spacing={4} style={{ marginTop: 15 }}>
            {props.titleMovie ?
              <Grid container spacing={4}>
                <GroupRadioSource {...props}/>
                <GroupRadioSort {...props}/>
              </Grid>
              : ''}
            {props.movie.length > 0 ?
              <>
                {props.movie ? props.movie.map((item, index) => (
                  <LazyLoad key={index} height={250}>
                    <CardPosterFilm {...item} />
                  </LazyLoad>
                )) : ''}
              </>
              : props.titleMovie && props.movie.length === 0 ? <NotResult title={props.titleMovie}/> : <CircularProgress />
            }
          </Grid>
        </Container>
      </main>
    </div>
  )
};
