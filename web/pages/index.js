import React, { Component } from 'react'
import axios from 'axios'
import ApiURL from '../utils/ApiURL';
import { withAuthSync } from '../utils/auth';
import { withTranslation } from "react-i18next";
import { Home } from "../src/components/templates/Home";

axios.defaults.withCredentials = true;

class Index extends Component {
  state = {
    movie: []
  };

  async componentDidMount() {
    const response = await axios.get(ApiURL.movie_hot);

    const responseData = response.data.rankedMovies;

    const FirstHotYts = await axios.get(`${ApiURL.movies}/${responseData.yts[0].imdb_id}`);
    const FirstHotPopcorn = await axios.get(`${ApiURL.movies}/${responseData.popcorn[0].imdb_id}`);

    const FirstHotPopcornData = FirstHotPopcorn.data.movie;
    const FirstHotYtsData = FirstHotYts.data.movie;

    this.setState(
      { movie: responseData,
        FirstHotYtsData: FirstHotYtsData,
        FirstHotPopcornData: FirstHotPopcornData,
      })
    }

  render () {
    return (
      <Home
        movie={this.state.movie}
        firstHotPopcorn={this.state.FirstHotPopcornData}
        firstHotYts={this.state.FirstHotYtsData}
      />
    )
  }
}
export default (withAuthSync(withTranslation()(Index)));
