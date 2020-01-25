import React from 'react';
import { Play } from "../components/templates/Play"
import matchaAPI from '../services/matcha-api'
import {authentified} from "../wrappers/auth";
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

class Player extends React.Component {

  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this)
  }

  static async getInitialProps({ query: { hash, id }, matchaClient }) {
    let movie, comments, subtitles
    if (hash && hash.length === 40 && typeof id === 'string')
      [movie, comments, subtitles] = await Promise.all([matchaClient.getMovie(id), matchaClient.getComments(id), matchaClient.getSubtitles(id)])

    return {
      movie,
      comments,
      hash,
      subtitles,
      movieId: id,
      namespacesRequired: ['common'],
    }
  }

  state = {
    comment: '',
    subtitles: [],
    userInfo: {},
    errorComment: ''
  };

  componentDidMount() {
    this.setState({subtitles: this.props.subtitles && this.props.subtitles.map(subtitle => {
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

        if (isChrome) {
          delete subtitle.label
        }
        return subtitle
      })})
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
    if (!this.state.comment.trim() || this.state.errorComment)
      return;

    matchaAPI.postComment(this.props.movieId, this.state.comment)
      .then(comment => {
        this.props.comments.push(comment);
        this.setState({ comments: this.state.comments, comment: ''});
      })
  };

  onStart = () => {
    matchaAPI.postMoviePlay(this.props.movie.imdb_id).catch(_ => {})
  };

  async getUser(ev) {
    const user = await matchaAPI.getUser(ev.currentTarget.value)
    this.setState({userInfo: user});
  }

  render() {
    const {classes} = this.props;
    return (
      <>
        <div style={{ display: 'flex' }}>
          <NavBar />
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
        </div>
        <div className={classes.footer}>
          <Copyright />
        </div>
      </>
    )
  }
}

export default withStyles(styles)(authentified(true)(Player));
