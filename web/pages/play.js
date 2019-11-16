import React from 'react';
import axios from "axios";
import ApiURL from "../utils/ApiURL";
import { Play } from "../src/components/templates/Play"

axios.defaults.withCredentials = true;

class Player extends React.Component {

  state = {
    movie: null,
    comments: null,
    subtitles: null,
    commentaire: '',
  };

  static async getInitialProps({ query }) {
    return {
      hash: query.hash,
      movieId: query.id
    }
  }

  handleChange = (e) => {
    this.setState({ commentaire: e.target.value});
  };

  handleClick = () => {
    if (this.state.commentaire) {
      const comment = {
        text: this.state.commentaire
      };
      axios.post(`${ApiURL.movies}/${this.props.movieId}/comments`, comment)
        .then(
          async response => {
            this.state.comments.unshift(response.data.comment);
            this.setState({ comments: this.state.comments, commentaire: ''});
          })
        .catch(error => {
          console.log(error);
        });
    }

  };

  async componentDidMount() {
    const response = await axios.get(`${ApiURL.movies}/${this.props.movieId}`);
    const responseComment = await axios.get(`${ApiURL.movies}/${this.props.movieId}/comments`);
    const responsesSubtitle = await axios.get(`${ApiURL.movies}/${this.props.movieId}/subtitles`);

    const responseData = await response.data.movie;
    const responseCommentData = await responseComment.data.comments.reverse();
    const responsesSubtitleData = await responsesSubtitle.data.subtitles;

    this.setState({ movie: responseData, comments: responseCommentData, subtitles: responsesSubtitleData});
  }

  render() {
    return (
      <Play
        movie={this.state.movie}
        hashMovie={this.props.hash}
        comment={this.state.comments}
        Click={this.handleClick}
        Change={this.handleChange}
        commentaire={this.state.commentaire}
        subtitles={this.state.subtitles}
      />
    )
  }
}

export default Player;
