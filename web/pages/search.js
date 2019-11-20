import React, {Component} from 'react';
import axios from "axios";
import ApiURL from "../utils/ApiURL";
import { withAuthSync } from '../utils/auth';
import Search from "../src/components/templates/Search";


axios.defaults.withCredentials = true;

class SearchPage extends Component {
  state = {
    movie: [],
    movies: [],
    hasMore: true,
    titleMovie: '',
    sort: 'title',
    source: 'popcorn',
    reverse: false,
    page: 1,
  };

  static async getInitialProps({ query }) {
    return {
      title: query.title,
    }
  }

  keyPressEnterSearch = (ev) => {
    if (ev.key === 'Enter') {
      this.state.titleMovie = ev.target.value;
      this.state.movies = [];
      this.state.page = 1;
      this.getSimilarTitleMovie({movieTitle: ev.target.value});
      ev.preventDefault();
    }
  };

  HandleChangeSource = (ev) => {
    this.state.movies = [];
    this.state.page = 1;
    this.getSimilarTitleMovie({source: ev.target.value});
  };

  HandleChangeSort = (ev) => {
    this.state.movies = [];
    this.state.page = 1;
    this.getSimilarTitleMovie({sort: ev.target.value});
  };

  HandleChangeReverse = (ev) => {
    this.state.movies = [];
    this.state.page = 1;
    this.getSimilarTitleMovie({reverse: ev.target.checked});
  };

  fetchMoreData = () => {
    this.getSimilarTitleMovie();
  };

  async getSimilarTitleMovie({movieTitle = this.state.titleMovie, source = this.state.source, sort = this.state.sort, reverse = this.state.reverse, page = this.state.page}={}) {
    if (movieTitle) {
      const response = await axios.get(`${ApiURL.movies_search}query=${encodeURIComponent(movieTitle)}&source=${source}&sort=${sort}&reverse=${reverse}&page=${page}`);
      const responseData = response.data.movies;
      this.setState({
        titleMovie: movieTitle,
        sort: sort,
        source: source,
        reverse: reverse,
        page: this.state.page + 1,
        movies: [...this.state.movies, ...responseData],
        hasMore: responseData.length > 0,
      })
    }
    else {
      const response = await axios.get(ApiURL.movie_hot);
      const responseData = [...response.data.rankedMovies.popcorn, ...response.data.rankedMovies.yts];
      this.setState({
        movie: responseData,
      })
    }
  }

  async componentDidMount() {
    this.getSimilarTitleMovie();
  }

  render () {
    return (
      <Search
        keyPressEnterSearch={this.keyPressEnterSearch}
        movie={this.state.movie}
        HandleChangeSource={this.HandleChangeSource}
        HandleChangeSort={this.HandleChangeSort}
        HandleChangeReverse={this.HandleChangeReverse}
        titleMovie={this.state.titleMovie}
        fetchMoreData={this.fetchMoreData}
        hasMore={this.state.hasMore}
        movies={this.state.movies}
      />
    )
  }
}

export default withAuthSync(SearchPage);
