import React, { Component } from 'react'
import { withAuthSync } from '../utils/auth';
import { withTranslation } from "react-i18next";
import { Home } from "../components/templates/Home";
import matchAPI from '../services/matcha-api'

// TODO cache some pages for some time

class Index extends Component {
  state = {
    movie: []
  };

  async componentDidMount() {
    const { rankedMovies } = await matchAPI.getHotMovies()
    this.setState({ movie: rankedMovies })

    // TODO Check if response has data
    const [featuredYTS, featuredPopcorn] = await Promise.all([matchAPI.getMovies(rankedMovies.yts[0].imdb_id), matchAPI.getMovies(rankedMovies.popcorn[0].imdb_id)])
    this.setState(
      {
        featuredYTS,
        featuredPopcorn,
      })
    }

  render () {
    return (
      <Home
        movie={this.state.movie}
        firstHotPopcorn={this.state.featuredPopcorn}
        firstHotYts={this.state.featuredYTS}
      />
    )
  }
}
export default (withAuthSync(withTranslation()(Index)));
