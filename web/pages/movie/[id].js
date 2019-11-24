import React, {Component} from 'react'
import { withRouter } from 'next/router'
import axios from "axios";
import ApiURL from "../../services/ApiURL";
import { withAuthSync } from '../../utils/auth'
import { Movie } from "../../components/templates/Movie";

axios.defaults.withCredentials = true;

class MoviePage extends Component {
  state = {
    movie: [],
    movieTorrent: []
  };

  static async getInitialProps({req, query: { id }}) {
    const responseDescription = await axios.get(`${ApiURL.movies}/${id}`);
    const responseTorrent = await axios.get(`${ApiURL.movies}/${id}/torrents`);

    const res = responseDescription.data;
    const resTorrent = responseTorrent.data;

    return {
      movieId: id,
      movie: res.movie,
      movieTorrent: resTorrent
    }
  }

  render () {
    return (
      <Movie movie={this.props.movie} movieTorrent={this.propsz.movieTorrent}/>
    )
  }
}

export default withRouter(withAuthSync(MoviePage));
