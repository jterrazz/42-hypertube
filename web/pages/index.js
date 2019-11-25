import React, { Component } from 'react'
import { withAuthSync } from '../utils/auth';
import { withTranslation } from "react-i18next";
import { Home } from "../components/templates/Home";
import { connect } from 'react-redux'

// TODO cache some pages for some time
// TODO On pages remove all withTranslation(), because getInitialProps is not called
// TODO Connect back translation
// TODO Auth middleware from redux

class Index extends Component {
  state = {
    movie: []
  };

  static async getInitialProps({Component, ctx, store, matchaClient}) {
    const { rankedMovies } = await matchaClient.getHotMovies()
    // TODO Check if response has data
    const [featuredYTS, featuredPopcorn] = await Promise.all([matchaClient.getMovie(rankedMovies.yts[0].imdb_id), matchaClient.getMovie(rankedMovies.popcorn[0].imdb_id)])

    return {
      rankedMovies,
      featuredYTS,
      featuredPopcorn,
    };
  }

  render () {
    return (
      <Home
        movie={this.props.rankedMovies}
        firstHotPopcorn={this.props.featuredPopcorn}
        firstHotYts={this.props.featuredYTS}
      />
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(Index);
