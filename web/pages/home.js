import React, { Component } from 'react'
import axios from 'axios'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Container from "@material-ui/core/Container/Container";
import Card from "@material-ui/core/Card/Card";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Box from "@material-ui/core/Box/Box";
import Rating from "@material-ui/lab/Rating/Rating";
import {makeStyles, useTheme} from "@material-ui/core";
import StarBorderIcon from '@material-ui/icons/StarBorder'
import API from '../src/API'
import Link from '@material-ui/core/Link'
import NavBar from "../src/NavBar";
import { withAuthSync } from '../utils/auth';
import CircularProgress from '../src/CircularProgress';
import { useTranslation } from 'react-i18next';
import {withTranslation} from "react-i18next";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  BigImg: {
    borderRadius: 10,
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

const HomeComponent = (props, {movie = null}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [t, i18n] = useTranslation();
  return (
    <div className={classes.root}>
      <NavBar />
      {props.movie && props.movie.popcorn && props.movie.yts ?
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container fixed>
          <Typography variant="h6">{t("Featured")}</Typography>
          <Typography variant="body2" color="textSecondary">
            {t("Discover our best picks")}
          </Typography>
          <Grid container spacing={5} style={{ marginTop: 15 }}>
            {props.movie && props.movie.popcorn ? props.movie.popcorn.slice(0, 2).map((item, index) => (
              <Grid key={index} item xs={12} md={6}>
                <Card elevation={0}>
                  <Link href={`/movie/${item.imdb_id}`}>
                    <CardMedia title={item.title} image={item.fanart_image} className={classes.BigImg} />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    <Box mb={1}>
                      <Typography variant="body2" color="textSecondary">
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
                    <Typography variant="caption" color="textSecondary" className={classes.subtitle}>
                      {`${item.rating} (${item.runtime} min)`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )) : '' }
          </Grid>
          {/*<Box mt={2}>*/}
            {/*<Typography variant="h6">*/}
              {/*Yts*/}
            {/*</Typography>*/}
          {/*</Box>*/}
          <Grid container spacing={4} style={{ marginTop: 15 }}>
            {props.movie && props.movie.yts ? props.movie.yts.slice(0, 6).map((item, index) => (
              <Grid item xs={4} md={2} key={index}>
                <Card elevation={0} className={classes.card}>
                  <Link href={`/movie/${item.imdb_id}`}>
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
                      {`${item.rating} (${item.runtime} min)`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )) : ''}
          </Grid>
          {/*<Box mt={2}>*/}
            {/*<Typography variant="h6">*/}
              {/*Popcorn*/}
            {/*</Typography>*/}
          {/*</Box>*/}
          <Grid container spacing={4} style={{ marginTop: 15 }}>
            {props.movie && props.movie.popcorn ? props.movie.popcorn.slice(0, 6).map((item, index) => (
              <Grid item xs={4} md={2} key={index}>
                <Card elevation={0} className={classes.card}>
                  <Link href={`/movie/${item.imdb_id}`}>
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
                      name="rating"
                      value={1}
                      max={1}
                      emptyIcon={<StarBorderIcon />}
                    />
                    <Typography variant="caption" color="textSecondary" className={classes.subtitle}>
                      {`${item.rating} (${item.runtime} min)`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )) : ''}
          </Grid>
        </Container>
      </main>
      :
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <CircularProgress />
        </main>
      }
    </div>
  )
};

axios.defaults.withCredentials = true;

class Home extends Component {
  state = {
    movie: []
  };

  async componentDidMount() {
    const response = await axios.get(API.movie_hot);

    const responseData = response.data.rankedMovies;

    this.props.i18n.changeLanguage('fr');

    this.setState({ movie: responseData })
  }

  render () {
    return (
      <HomeComponent movie={this.state.movie}/>
    )
  }
}
export default withTranslation()(withAuthSync(Home));
