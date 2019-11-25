import React from 'react';
import { Play } from "../components/templates/Play"
import matchaAPI from '../services/matcha-api'

class Player extends React.Component {

  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this)
  }

  state = {
    movie: null,
    comments: null,
    subtitles: null,
    comment: '',
    userInfo: {}
  };

  static async getInitialProps({ query }) {
    return {
      hash: query.hash,
      movieId: query.id
    }
  }

  handleChange = (e) => {
    this.setState({ comment: e.target.value});
  };

  handleClick = () => {
    if (!this.state.comment)
      return;

    matchaAPI.postComment(this.props.movieId, this.state.comment)
      .then(comment => {
        this.state.comments.unshift(comment);
        this.setState({ comments: this.state.comments, comment: ''});
      })
  };

  onStart = () => {
    matchaAPI.postMoviePlay(this.state.movie.imdb_id).catch(_ => {})
  };

  async getUser(ev) { // TODO Replace by redux // keep if useful
    // const response = await axios.get(`${ApiURL.users}${ev.currentTarget.value}`);
    // const responseData = await response.data;
    // this.setState({userInfo: responseData});
  }

  async componentDidMount() {
    const movieId = this.props.movieId

    matchaAPI.getMovie(movieId)
      .then(movie => {
        this.setState({ movie });
      })
      .catch(_ => {})

    const [comments, subtitles] = await Promise.all([matchaAPI.getComments(movieId), matchaAPI.getSubtitles(movieId)])
    this.setState({ comments, subtitles });
  }

  render() {
    return (
      <Play
        movie={this.state.movie}
        hashMovie={this.props.hash}
        comment={this.state.comments}
        Click={this.handleClick}
        Change={this.handleChange}
        commentaire={this.state.comment}
        subtitles={this.state.subtitles}
        getUser={this.getUser}
        userInfo={this.state.userInfo}
        onStart={this.onStart}
      />
    )
  }
}

export default Player;