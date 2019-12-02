import React from 'react';
import { Play } from "../components/templates/Play"
import matchaAPI from '../services/matcha-api'
import {authentified} from "../wrappers/auth";

class Player extends React.Component {

  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this) // TODO Del
  }

  static async getInitialProps({ query: { hash, id }, matchaClient }) {
    const [movie, comments] = await Promise.all([matchaClient.getMovie(id), matchaClient.getComments(id)])

    return {
      movie,
      comments,
      hash,
      movieId: id,
      namespacesRequired: ['common'],
    }
  }

  state = {
    subtitles: null,
    comment: '',
    userInfo: {},
    errorComment: ''
  };

  async componentdidmount() {
    const subtitles = await matchaAPI.getSubtitles(this.props.movieId)
    this.setState({ subtitles })
  }

  handleChange = (e) => {
    this.setState({ comment: e.target.value});

    if (e.target.value.length < 5) {
      this.setState({errorComment: 'Too Short!'});
      return;
    }

    if (e.target.value.length > 150) {
      this.setState({errorComment: 'Too Long!'});
      return;
    }

    this.setState({errorComment: ''});
  };

  handleClick = () => {
    if (!this.state.comment || this.state.errorComment)
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

  async getUser(ev) { // TODO Replace by redux // + don't use a function but pass the user object
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
        subtitles={this.state.subtitles}
        getUser={this.getUser}
        userInfo={this.state.userInfo}
        onStart={this.onStart}
        errorComment={this.state.errorComment}
      />
    )
  }
}

export default authentified(true)(Player);
