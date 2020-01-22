import React, {Component} from 'react'
import {Home} from "../components/templates/Home";
import {connect} from 'react-redux'
import {authentified} from '../wrappers/auth'
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

class Index extends Component {

  static async getInitialProps({matchaClient}) {
    const {rankedMovies} = await matchaClient.getHotMovies()
    if (!rankedMovies)
      return {};

    const [featuredYTS, featuredPopcorn] = await Promise.all([matchaClient.getMovie(rankedMovies.yts[0].imdb_id), matchaClient.getMovie(rankedMovies.popcorn[0].imdb_id)])

    return {
      rankedMovies,
      featuredYTS,
      featuredPopcorn,
      namespacesRequired: ['common']
    };
  }

  render() {
    const {classes} = this.props;
    return (
      <>
        <div style={{ display: 'flex' }}>
          <NavBar />
          <Home
            movie={this.props.rankedMovies}
            firstHotPopcorn={this.props.featuredPopcorn}
            firstHotYts={this.props.featuredYTS}
          />
        </div>
        <div className={classes.footer}>
          <Copyright />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default withStyles(styles)(authentified(true)(connect(mapStateToProps)(Index)));
