import React, {Component} from 'react';
import axios from "axios";
import ApiURL from "../services/ApiURL";
import { withAuthSync } from '../utils/auth';
import Search from "../components/templates/Search";


axios.defaults.withCredentials = true;

class SearchPage extends Component {
  state = {
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
        movies: [...this.state.movies, ...responseData],
        hasMore: false,
      })
    }
  }

  async componentDidMount() {
    this.getSimilarTitleMovie({movieTitle: this.props.title});
  }

  render () {
    return (
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
    )
  }
}

export default withAuthSync(SearchPage);
