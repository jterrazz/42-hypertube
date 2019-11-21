import React, {Component} from 'react'
import { withRouter } from 'next/router'
import axios from "axios";
import ApiURL from "../../utils/ApiURL";
import { withAuthSync } from '../../utils/auth'
import { Movie } from "../../src/components/templates/Movie";

axios.defaults.withCredentials = true;

class MoviePage extends Component {
  state = {
    movie: [],
    movieTorrent: []
  };

  static async getInitialProps({req, query: { id }}) {
    return {
      movieId: id
    }
  }

  async componentDidMount() {
    const responseDescription = await axios.get(`${ApiURL.movies}/${this.props.movieId}`);
    const responseTorrent = await axios.get(`${ApiURL.movies}/${this.props.movieId}/torrents`);

    const res = responseDescription.data;
    const resTorrent = responseTorrent.data;

    this.setState({ movie: res.movie , movieTorrent: resTorrent})
  }

  render () {
    return (
      <Movie movie={this.state.movie} movieTorrent={this.state.movieTorrent}/>
    )
  }
}

export default withRouter(withAuthSync(MoviePage));
