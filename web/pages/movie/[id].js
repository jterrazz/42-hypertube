import React, {Component} from 'react'
// import { withRouter } from 'next/router'
import { withAuthSync } from '../../utils/auth'
import { Movie } from "../../components/templates/Movie";

class MoviePage extends Component {
  state = {
    movie: [],
    movieTorrent: []
  };

  static async getInitialProps({req, query: { id }, matchaClient }) {
    const [movie, movieTorrent] = await Promise.all([matchaClient.getMovie(id), matchaClient.getMovieTorrents(id)])
    return { movieId: id, movie, movieTorrent }
  }

  render () {
    return (
      <Movie movie={this.props.movie} movieTorrent={this.props.movieTorrent}/>
    )
  }
}

export default withAuthSync(MoviePage);
// export default withRouter(withAuthSync(MoviePage));
