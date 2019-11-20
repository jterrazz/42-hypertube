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
// import InfiniteScroll from "react-infinite-scroll-component";
import App from "../../infiniteScroll";
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
              <>
                <Grid container spacing={4}>
                  <GroupRadioSource {...props}/>
                  <GroupRadioSort {...props}/>
                  <GroupRadioReverse {...props}/>
                </Grid>
                <InfiniteScroll
                  dataLength={props.movies.length} //This is important field to render the next data
                  next={props.fetchMoreData}
                  hasMore={props.hasMore}
                  loader={<CircularProgress />}
                >
                  <Grid container spacing={4}>
                    {props.movies.map((item, index) => (
                      <CardPosterFilm {...item} key={index}/>
                    ))}
                  </Grid>
                </InfiniteScroll>
              </>
              :
              <>
                {props.movie ?
                  <>
                    {props.movie.map((item, index) => <CardPosterFilm {...item} key={index}/>)}
                  </>
                  : ''
                }
              </>
            }
          </Grid>
        </Container>
      </main>
    </div>
  )
};

export default Search;
