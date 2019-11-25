import React, { Component } from 'react'
import { withAuthSync } from '../utils/auth';
import { withTranslation } from "react-i18next";
import { Home } from "../components/templates/Home";
import matchAPI from '../services/matcha-api'
import {login as loginAction} from "../store/actions/auth";

// TODO cache some pages for some time

class Index extends Component {
  state = {
    movie: []
  };

  static async getInitialProps({Component, ctx}) {
    console.log("thisshouldlog")
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return {pageProps};
  }

  async componentDidMount() {
    const { rankedMovies } = await matchAPI.getHotMovies()
    this.setState({ movie: rankedMovies })

    // TODO Check if response has data
    const [featuredYTS, featuredPopcorn] = await Promise.all([matchAPI.getMovie(rankedMovies.yts[0].imdb_id), matchAPI.getMovie(rankedMovies.popcorn[0].imdb_id)])
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
