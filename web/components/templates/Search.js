import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
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
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  items: {
    overflow: 'hidden !important',
  }
}));

const Search = (props) => {
  const classes = useStyles();
  return (
    <main className={classes.content} >
      <div className={classes.toolbar} />

      <Container fixed>
        <InputSearch {...props} />
        <Grid container spacing={4} style={{ marginTop: 15 }}>

          {props.titleMovie ?
            <Grid container spacing={4}>
              <GroupRadioSource {...props}/>
              <GroupRadioSort {...props}/>
              <GroupRadioReverse {...props}/>
            </Grid>
            : ''}

          {props.titleMovie && props.movies.length === 0 ? <NotResult title={props.titleMovie}/> : ''}
        </Grid>

        <InfiniteScroll
          className={classes.items}
          dataLength={props.movies.length}
          next={props.fetchMoreData}
          hasMore={props.hasMore}
        >
          <Grid container spacing={4} style={{ marginTop: 15, }}>
            {props.movies.map((item, index) => (
              <CardPosterFilm {...item} key={index} />
            ))}
          </Grid>
        </InfiniteScroll>

      </Container>

    </main>
  )
};

export default Search;
