import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Player from '../src/Player'
import NavBar from "../src/NavBar";
import axios from "axios";
import API from "../src/API";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Rating from "@material-ui/lab/Rating/Rating";
import StarBorderIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
  },
  media: {
    borderRadius : 10,
    height: 250,
  },
  img: {
    borderRadius: 5,
    height: 250,
  },
  card: {
    maxWidth: 300,
  },
  subtitle: {
    margin: theme.spacing(0.5),
  }
}));

function PlayerMovie(props, {movie = null, hashMovie = null, comment = null}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container fixed>
          {props.movie ?
            <Grid>
              <Player hash_movie={props.hashMovie} thumbnail={props.movie.fanart_image}/>
            </Grid>
          : '' }
          {props.movie ?
            <Grid container spacing={3} style={{marginTop: 10}}>
              <Grid item xs={12} md={8}>
                <Paper className={classes.paper} elevation={0}>
                  <Typography variant="h4">{props.movie.title}</Typography>
                  <Rating
                    style={{ fontSize: 13 }}
                    name="customized-empty"
                    value={1}
                    max={1}
                    emptyIcon={<StarBorderIcon />}
                  />
                  <Typography variant="caption" color="textSecondary" className={classes.subtitle}>
                    {`${props.movie.rating} (${props.movie.runtime} min)`}
                  </Typography>
                  <Box mb={1} mt={1}>
                    <Typography variant="body2" color="textSecondary">
                      {props.movie.release_date}
                    </Typography>
                  </Box>
                  <Typography variant="caption" component="p">
                    {props.movie.overview}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography variant="h4">Casting</Typography>
                <Grid container spacing={4} style={{ marginTop: 15 }}>
                  {props.movie && props.movie.cast ? props.movie.cast.slice(0, 4).map((item, index) => (
                    <Grid item xs={4} md={3} key={index}>
                      <Card elevation={0} className={classes.card}>
                        <CardMedia title={item.character} image={item.profile_path} className={classes.img} />
                        <CardContent>
                          <Typography gutterBottom variant="subtitle2" component="h5">
                            {item.character}
                          </Typography>
                          <Box mb={1}>
                            <Typography variant="caption" color="textSecondary">
                              {item.name}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  )) : ''}
                </Grid>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper className={classes.paper} elevation={0}>
                  <TextField
                    id="standard-input"
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    multiline
                    value={props.commentaire}
                    onChange={props.Change}
                    rowsMax="4"
                    placeholder="Ajouter un commentaire public..."
                  />
                  <Grid container justify="flex-end">
                    <Grid item xs={9} md={9}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        size="small"
                        onClick={props.Click}
                      >
                        Ajouter un commentaire
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>

                {props.comment ? props.comment.map((item, index) => (
                  <Paper className={classes.paper} elevation={0} key={index}>
                    <Typography variant="body2" color="textSecondary">
                      @{item.user.username} - {Moment(item.date).format('YYYY-MM-DD')}.
                    </Typography>
                    <Typography variant="body2">
                      {item.text}
                    </Typography>
                  </Paper>
                )) : ''}

              </Grid>

              {/*<Grid item xs={12} md={6}>*/}
                {/*<Typography variant="h4">{props.movie.title}</Typography>*/}
                {/*<CardMedia*/}
                  {/*className={classes.media}*/}
                  {/*image={props.movie.fanart_image}*/}
                  {/*title={props.movie.title}*/}
                {/*/>*/}
              {/*</Grid>*/}

            </Grid>
          : '' }
        </Container>
      </main>
    </div>
  )
}

PlayerMovie.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

axios.defaults.withCredentials = true;

class Play extends React.Component {

  state = {
    movie: null,
    comments: null,
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
      axios.post(`${API.movies}/${this.props.movieId}/comments`, comment)
        .then(
          async response => {
            const responseComment = await axios.get(`${API.movies}/${this.props.movieId}/comments`);
            const responseCommentData = await responseComment.data.comments.reverse();
            this.setState({ comments: responseCommentData, commentaire: ''});
          })
        .catch(error => {
          console.log(error);
        });
    }

  };

  async componentDidMount() {
    const response = await axios.get(`${API.movies}/${this.props.movieId}`);
    const responseComment = await axios.get(`${API.movies}/${this.props.movieId}/comments`);

    const responseData = await response.data.movie;
    const responseCommentData = await responseComment.data.comments.reverse();

    this.setState({ movie: responseData, comments: responseCommentData});
  }

  render() {
    return (
      <PlayerMovie
        movie={this.state.movie}
        hashMovie={this.props.hash}
        comment={this.state.comments}
        Click={this.handleClick}
        Change={this.handleChange}
        commentaire={this.state.commentaire}
      />
    )
  }

}


export default Play;
