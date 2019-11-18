import React, {Component} from 'react';
import axios from "axios";
import ApiURL from "../utils/ApiURL";
import { withAuthSync } from '../utils/auth';
import Search from "../src/components/templates/Search";


axios.defaults.withCredentials = true;

class SearchPage extends Component {
  state = {
    movie: [],
    hasMore: true,
    titleMovie: '',
    sort: 'title',
    source: 'popcorn',
    reverse: false,
    page: 1,
    movies: [],
    search: true,
  };

  static async getInitialProps({ query }) {
    return {
      title: query.title,
    }
  }

  keyPressEnterSearch = (ev) => {
    if (ev.key === 'Enter') {
      this.state.titleMovie = ev.target.value;
      this.getSimilarTitleMovie({movieTitle: ev.target.value});
      ev.preventDefault();
    }
  };

  HandleChangeSource = (ev) => {
    this.getSimilarTitleMovie({source: ev.target.value});
  };

  HandleChangeSort = (ev) => {
    this.getSimilarTitleMovie({sort: ev.target.value});
  };

  HandleChangeReverse = (ev) => {
    this.getSimilarTitleMovie({reverse: ev.target.checked});
  };

  fetchMoreData = () => {
    this.state.page += 1;
    this.getSimilarTitleMovie({page: this.state.page});

    if (this.state.movie.length === 0 || this.state.search) {
      this.setState({ hasMore: false });
      return;
    }

    this.setState({
      movies: this.state.movies.concat(this.state.movie)
    });
  };

  async getSimilarTitleMovie({movieTitle = this.state.titleMovie, source = this.state.source, sort = this.state.sort, reverse = this.state.reverse, page = this.state.page}={}) {
    let responseData = [];

    if (movieTitle) {
      const response = await axios.get(`${ApiURL.movies_search}query=${encodeURIComponent(movieTitle)}&source=${source}&sort=${sort}&reverse=${reverse}&page=${page}`);
      responseData = response.data.movies;
      this.state.search = false;
    }
    else {
      const response = await axios.get(ApiURL.movie_hot);
      responseData = [...response.data.rankedMovies.popcorn, ...response.data.rankedMovies.yts];
    }

    this.state.sort = sort;
    this.state.source = source;
    this.state.reverse = reverse;
    this.state.page = page;
    this.state.movies = this.state.movies.concat(responseData);

    this.setState({ movie: responseData, titleMovie: movieTitle})
  }

  async componentDidMount() {
    this.getSimilarTitleMovie();
  }

  render () {
    return (
      <Search
        keyPressEnterSearch={this.keyPressEnterSearch}
        movie={this.state.movie}
        movies={this.state.movies}
        HandleChangeSource={this.HandleChangeSource}
        HandleChangeSort={this.HandleChangeSort}
        HandleChangeReverse={this.HandleChangeReverse}
        titleMovie={this.state.titleMovie}
        fetchMoreData={this.fetchMoreData}
        hasMore={this.state.hasMore}
      />
    )
  }
}

export default withAuthSync(SearchPage);
