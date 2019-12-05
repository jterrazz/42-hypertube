import React, {Component} from 'react'
import {Movie} from "../../components/templates/Movie";
import {authentified} from "../../wrappers/auth";
import NavBar from "../../components/organisms/NavBar";

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
    return (
      <div style={{ display: 'flex' }}>
        <NavBar />
        <Movie movie={this.props.movie} movieTorrent={this.props.movieTorrent}/>
      </div>
    )
  }
}

export default authentified(true)(MoviePage);
