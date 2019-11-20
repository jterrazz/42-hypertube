import React, {Component} from 'react'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite'
import { withRouter } from 'next/router'
import axios from "axios";
import ApiURL from "../../utils/ApiURL";
import Card from "@material-ui/core/Card/Card";
import Link from '@material-ui/core/Link'
import CardContent from "@material-ui/core/CardContent/CardContent";
import Rating from "@material-ui/lab/Rating/Rating";
import StarBorderIcon from "@material-ui/core/SvgIcon/SvgIcon";
import NavBar from "../../src/components/organisms/NavBar";
import { withAuthSync } from '../../utils/auth'
import CircularProgress from "@material-ui/core/CircularProgress";
import URL_Images from "../../utils/BasicImage";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  media: {
    borderRadius : 10,
    height: 300,
  },
  state: {
    color: '#EBBA16',
  },
  Paper: {
    padding: theme.spacing(1, 1),
    backgroundColor: '#FCFBFC',
    marginBottom: 15,
  },
  play: {
    color: '#EBBA16',
    fontSize: 36,
  },
  toolbarButtons: {
    marginLeft: 'auto',
    marginRight: -12,
  },
  img: {
    borderRadius: 5,
    height: 250,
  },
  card: {
    maxWidth: 300,
  },
}));

const MovieComponent = (props, {movie = null, movieTorrent = null, movieId = null}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [t, i18n] = useTranslation();
  const TorrentComponent = (props, {sourceTorrent = null, titleMovie = null}) => {
    return (
      <>
        {props.sourceTorrent ? props.sourceTorrent.map((item, index) => (
          <Paper key={index} className={classes.Paper} elevation={0}>
            <Toolbar>
              <Box mr={2}>
                <Typography variant="h6">{`${item.size}`}</Typography>
              </Box>
              <Typography variant="subtitle1">
                <div>
                  <Typography variant="subtitle1">{props.titleMovie} - Torrent {index + 1}</Typography>
                </div>
                <div>
                  <Typography component="p" className={classes.state}>
                    {`${item.seeds} seeds - ${item.peers} peers`}
                  </Typography>
                </div>
              </Typography>
              <span className={classes.toolbarButtons}>
              <IconButton color="inherit" aria-label="More Options" href={`/play?hash=${item.hash}&id=${props.movieId}`}>
                <PlayCircleFilledWhiteIcon className={classes.play}/>
              </IconButton>
            </span>
            </Toolbar>
          </Paper>
        )) : ''}
      </>
    )
  };

  return (
    <div className={classes.root}>
      <NavBar />
      {props.movie.title ?
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container fixed>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h2" gutterBottom>
                  {props.movie && props.movie.title ? props.movie.title : ''}
                </Typography>
                <Typography variant="h4" gutterBottom color="textSecondary">
                  {props.movie && props.movie.release_date ? props.movie.release_date : ''}
                </Typography>
                <Typography variant="body2" gutterBottom color="textPrimary">
                  {props.movie && props.movie.overview ? props.movie.overview : ''}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                {props.movie && props.movie.fanart_image ?
                  <CardMedia
                    className={classes.media}
                    image={props.movie.fanart_image !== 'https://image.tmdb.org/t/p/originalnull' ? props.movie.fanart_image : URL_Images.fanart}
                    title={props.movie.title}
                  />
                  : ''}
              </Grid>

              {props.movie && props.movie.similar.length > 0 ?
              <Grid item xs={12} md={6}>
                <Typography variant="h4">{t("Similar")}</Typography>
                <Grid container spacing={4} style={{ marginTop: 15 }}>
                  {props.movie && props.movie.similar ? props.movie.similar.slice(0, 4).map((item, index) => (
                    <Grid item xs={4} md={3} key={index}>
                      <Card elevation={0} className={classes.card}>
                        <Link href={`/search?title=${encodeURIComponent(item.title)}`}>
                          <CardMedia title={item.title} image={item.poster_image} className={classes.img} />
                        </Link>
                        <CardContent>
                          <Typography gutterBottom variant="subtitle2" component="h5">
                            {item.title}
                          </Typography>
                          <Box mb={1}>
                            <Typography variant="caption" color="textSecondary">
                              {item.release_date}
                            </Typography>
                          </Box>
                          <Rating
                            style={{ fontSize: 13 }}
                            name="customized-empty"
                            value={1}
                            max={1}
                            emptyIcon={<StarBorderIcon />}
                          />
                          <Typography variant="caption" color="textSecondary" style={{ margin: theme.spacing(0.5) }}>
                            {`${item.rating}`}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )) : ''}
                </Grid>
              </Grid>
              : '' }

              <Grid item xs={12} md={6}>
                <Typography variant="h4">Torrents</Typography>
                {props.movieTorrent ? Object.keys(props.movieTorrent).map((item) => (
                  <div key={item}>
                    <Box mt={3} mb={2}>
                      <Typography variant="subtitle2" color="textSecondary" style={{ textTransform: 'capitalize' }}>
                        {item}
                      </Typography>
                    </Box>
                    <TorrentComponent sourceTorrent={props.movieTorrent[item]} titleMovie={props.movie && props.movie.title? props.movie.title : ''} movieId={props.movie.imdb_id}/>
                  </div>
                )) : ''}
              </Grid>
            </Grid>
          </Container>
        </main>
        :
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid
                container
                justify="center"
            >
              <Grid item>
                <CircularProgress/>
              </Grid>
            </Grid>
          </main>
      }
    </div>
  )
};

axios.defaults.withCredentials = true;

class Movie extends Component {
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
      <MovieComponent movie={this.state.movie} movieTorrent={this.state.movieTorrent}/>
    )
  }
}

export default withRouter(withAuthSync(Movie));
