import React, {Component} from 'react';
import axios from "axios";
import ApiURL from "../utils/ApiURL";
import { withAuthSync } from '../utils/auth';
import { Search } from "../src/components/templates/Search";


axios.defaults.withCredentials = true;


class SearchPage extends Component {
  state = {
    movie: [],
    titleMovie: ''
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

  async getSimilarTitleMovie({movieTitle = this.state.titleMovie, source = 'popcorn', sort = 'title'}={}) {
    let responseData = [];

    if (movieTitle) {
      const response = await axios.get(`${ApiURL.movies_search}query=${encodeURIComponent(movieTitle)}&source=${source}&sort=${sort}`);
      responseData = response.data.movies;
    }
    else {
      const response = await axios.get(ApiURL.movie_hot);
      responseData = [...response.data.rankedMovies.popcorn, ...response.data.rankedMovies.yts];
    }

    this.setState({ movie: responseData, titleMovie: movieTitle})
  }

  async componentDidMount() {
    this.getSimilarTitleMovie({movieTitle: this.props.title});
  }

  render () {
    return (
      <Search
        keyPressEnterSearch={this.keyPressEnterSearch}
        movie={this.state.movie}
        HandleChangeSource={this.HandleChangeSource}
        HandleChangeSort={this.HandleChangeSort}
        titleMovie={this.state.titleMovie}
      />
    )
  }
}

export default withAuthSync(SearchPage);
