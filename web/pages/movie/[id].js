import React, {Component} from 'react'
import {Movie} from "../../components/templates/Movie";
import {authentified} from "../../wrappers/auth";
import NavBar from "../../components/organisms/NavBar";
import Copyright from "../../components/atoms/Copyright";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
  footer: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 240,
    }
  }
});

class MoviePage extends Component {
  state = {
    movie: [],
    movieTorrent: []
  };

  static async getInitialProps({query: {id}, matchaClient}) {
    const [movie, movieTorrent] = await Promise.all([matchaClient.getMovie(id), matchaClient.getMovieTorrents(id)])
    return {
      movieId: id,
      movie,
      movieTorrent,
      namespacesRequired: ['common'],
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <>
        <div style={{ display: 'flex' }}>
          <NavBar />
          <Movie movie={this.props.movie} movieTorrent={this.props.movieTorrent}/>
        </div>
        <div className={classes.footer}>
          <Copyright />
        </div>
      </>
    )
  }
}

export default withStyles(styles)(authentified(true)(MoviePage));
