import React from "react";
import NavBar from "../organisms/NavBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LazyLoad from "react-lazyload";
import CircularProgress from "../atoms/CircularProgress";
import { InputSearch } from "../atoms/InputSearch";
import { GroupRadioSource } from "../molecules/GroupRadioSource";
import { GroupRadioSort } from "../molecules/GroupRadioSort";
import { GroupRadioReverse } from "../molecules/GroupRadioReverse";
import { CardPosterFilm } from "../molecules/CardPosterFilm";
import { NotResult } from "../molecules/NotResult";
import { makeStyles } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  }
}));

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
  display: 'flex',
};

const Search = (props) => {
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
                <GroupRadioReverse {...props}/>
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

            {/*<InfiniteScroll*/}
              {/*dataLength={props.movies.length}*/}
              {/*next={props.fetchMoreData}*/}
              {/*hasMore={props.hasMore}*/}
              {/*loader={<h4>Loading...</h4>}*/}
              {/*endMessage={*/}
                {/*<p style={{ textAlign: "center" }}>*/}
                  {/*<b>Yay! You have seen it all</b>*/}
                {/*</p>*/}
              {/*}*/}
            {/*>*/}
              {/*{props.movies.map((item, index) => (*/}
                {/*<CardPosterFilm {...item} height={250} key={index}/>*/}
              {/*))}*/}
            {/*</InfiniteScroll>*/}

          </Grid>
        </Container>
      </main>
    </div>
  )
};

export default Search;
