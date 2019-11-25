import React, { Component } from 'react'
import { withAuthSync } from '../utils/auth';
import { withTranslation } from "react-i18next";
import { Home } from "../components/templates/Home";
import matchAPI from '../services/matcha-api'
import { loginAction } from "../store/actions/auth";

import { connect } from 'react-redux'

// TODO cache some pages for some time
// TODO On pages remove all withTranslation(), because getInitialProps is not called

class Index extends Component {
  state = {
    movie: []
  };

  static async getInitialProps({Component, ctx, store}) {
    store.dispatch(loginAction)
    return {};
  }

  async componentDidMount() {
    console.log(this.props)
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

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(Index);
