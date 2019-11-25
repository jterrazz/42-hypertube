import React from 'react';
import { Play } from "../components/templates/Play"
import matchaAPI from '../services/matcha-api'

class Player extends React.Component {

  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this) // TODO Del
  }

  static async getInitialProps({ query: { hash, id }, matchaClient }) {
    const [movie, comments, subtitles] = await Promise.all([matchaClient.getMovie(id), matchaClient.getComments(id), matchaClient.getSubtitles(id)])

    return {
      movie,
      comments,
      subtitles,
      hash,
      movieId: id
    }
  }

  state = {
    movie: null,
    comments: null,
    subtitles: null,
    comment: '',
    userInfo: {}
  };

  handleChange = (e) => {
    this.setState({ comment: e.target.value});
  };

  handleClick = () => {
    if (!this.props.comment)
      return;

    matchaAPI.postComment(this.props.movieId, this.state.comment)
      .then(comment => {
        this.props.comments.unshift(comment);
        this.setState({ comments: this.state.comments, comment: ''});
      })
  };

  onStart = () => {
    matchaAPI.postMoviePlay(this.props.movie.imdb_id).catch(_ => {})
  };

  async getUser(ev) { // TODO Replace by redux // keep if useful
    // const response = await axios.get(`${ApiURL.users}${ev.currentTarget.value}`);
    // const responseData = await response.data;
    // this.setState({userInfo: responseData});
  }

  render() {
    return (
      <Play
        movie={this.props.movie}
        hashMovie={this.props.hash}
        comment={this.props.comments}
        Click={this.handleClick}
        Change={this.handleChange}
        commentaire={this.state.comment}
        subtitles={this.props.subtitles}
        getUser={this.getUser}
        userInfo={this.state.userInfo}
        onStart={this.onStart}
      />
    )
  }
}

export default Player;
