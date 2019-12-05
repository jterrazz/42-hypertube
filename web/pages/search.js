import React, {Component} from 'react';
import Search from "../components/templates/Search";
import matchaClient from '../services/matcha-api'
import {authentified} from "../wrappers/auth";
import NavBar from "../components/organisms/NavBar";
import Copyright from "../components/atoms/Copyright";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
  footer: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 240,
    }
  }
});

class SearchPage extends Component {
  _isMounted = false;

  state = {
    movies: [],
    hasMore: true,
    titleMovie: '',
    sort: 'title',
    source: 'popcorn',
    reverse: false,
    page: 1,
  };

  static async getInitialProps({query}) {
    return {
      title: query.title,
      namespacesRequired: ['common'],
    }
  }

  Reset_Param = () => {
    this.state.movies = [];
    this.state.page = 1;
  };

  keyPressEnterSearch = (ev) => {
    if (ev.key === 'Enter') {
      this.state.titleMovie = ev.target.value;
      this.Reset_Param();
      this.getSimilarTitleMovie({movieTitle: ev.target.value});
      ev.preventDefault();
    }
  };

  HandleChangeSource = (ev) => {
    this.Reset_Param();
    this.getSimilarTitleMovie({source: ev.target.value});
  };

  HandleChangeSort = (ev) => {
    this.Reset_Param();
    this.getSimilarTitleMovie({sort: ev.target.value});
  };

  HandleChangeReverse = (ev) => {
    this.Reset_Param();
    this.getSimilarTitleMovie({reverse: ev.target.checked});
  };

  fetchMoreData = () => {
    this.getSimilarTitleMovie();
  };

  async getSimilarTitleMovie({movieTitle = this.state.titleMovie, source = this.state.source, sort = this.state.sort, reverse = this.state.reverse, page = this.state.page} = {}) {
    if (movieTitle) {
      const movies = await matchaClient.searchMovies({
        query: movieTitle,
        source,
        sort,
        reverse,
        page
      })
      this.setState({
        titleMovie: movieTitle,
        sort: sort,
        source: source,
        reverse: reverse,
        page: this.state.page + 1,
        movies: [...this.state.movies, ...movies],
        hasMore: movies.length > 0,
      })
    } else {
      const movies = await matchaClient.getHotMovies()
      this.setState({
        movies: [...movies.rankedMovies.popcorn, ...movies.rankedMovies.yts],
        hasMore: false
      })
    }
  }

  async componentDidMount() {
    this._isMounted = true;
    this.getSimilarTitleMovie({movieTitle: this.props.title});
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {classes} = this.props;
    return (
      <>
        <div style={{ display: 'flex' }}>
          <NavBar />
          <Search
            keyPressEnterSearch={this.keyPressEnterSearch}
            HandleChangeSource={this.HandleChangeSource}
            HandleChangeSort={this.HandleChangeSort}
            HandleChangeReverse={this.HandleChangeReverse}
            titleMovie={this.state.titleMovie}
            fetchMoreData={this.fetchMoreData}
            hasMore={this.state.hasMore}
            movies={this.state.movies}
          />
        </div>
        <div className={classes.footer}>
          <Copyright />
        </div>
      </>
    )
  }
}

export default withStyles(styles)(authentified(true)(SearchPage));
