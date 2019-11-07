import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import NavBar from "../src/NavBar";
import API from "../src/API";
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import Link from '@material-ui/core/Link'
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import Rating from "@material-ui/lab/Rating/Rating";
import StarBorderIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { withAuthSync } from '../utils/auth';
import CircularProgress from '../src/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import LazyLoad from 'react-lazyload';
import URL_Images from "../src/BasicImage";
import { NotResult } from "../src/NotResult";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  searchInput: {
    fontSize: 32
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
  },
  RadioGroup: {
    flexDirection: "row",
  }
}));

const SearchHome = (props, {movie = null}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('title');

  const handleChangeReset = () => {
    setValue('title');
  };

  const handleChange = (ev) => {
    setValue(ev.target.value);
  };

  const [t, i18n] = useTranslation();

  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content} >
        <div className={classes.toolbar} />
        <Container fixed>
          <TextField
            id="search"
            label={t("Search")}
            placeholder={t("Find Movies, TV Shows, ...")}
            fullWidth
            onKeyPress={props.keyPressEnterSearch}
            margin="normal"
            InputProps={{
              classes: {
                input: classes.searchInput,
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
            <Grid container spacing={4} style={{ marginTop: 15 }}>
              {props.titleMovie ?
                <Grid container spacing={4}>
                  <Grid item md={6}>
                    <FormControl component="fieldset">
                      <RadioGroup defaultValue="popcorn" className="RadioGroup" aria-label="gender" name="customized-radios" row onChange={e => {props.HandleChangeSource(e); handleChangeReset()}}>
                        <FormControlLabel
                          value="popcorn"
                          control={<Radio color="primary" />}
                          label="Popcorn"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value="yts"
                          control={<Radio color="primary" />}
                          label="Yts"
                          labelPlacement="start"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item md={6}>
                    <FormControl component="fieldset">
                      <RadioGroup value={value} aria-label="gender" className="RadioGroup" row onChange={e => {props.HandleChangeSort(e); handleChange(e)}}>
                        <FormControlLabel
                          value="title"
                          control={<Radio color="primary" />}
                          label={t("Title")}
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value="year"
                          control={<Radio color="primary" />}
                          label={t("Year")}
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value="date_added"
                          control={<Radio color="primary" />}
                          label={t("Date Added")}
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value="rating"
                          control={<Radio color="primary" />}
                          label={t("Rating")}
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value="trending"
                          control={<Radio color="primary" />}
                          label={t("Trending")}
                          labelPlacement="start"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                : ''}
              {props.movie.length > 0 ?
                <>
                  {props.movie ? props.movie.map((item, index) => (
                    <LazyLoad key={index} height={250}>
                      <Grid item xs={4} md={2} key={index}>
                        <Card elevation={0} className={classes.card}>
                          <Link href={`/movie/${item.imdb_id}`}>
                            <CardMedia title={item.title} image={item.poster_image ? item.poster_image : URL_Images.poster} className={classes.img} />
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
                    </LazyLoad>
                  )) : ''}
                </>
                : props.titleMovie && props.movie.length === 0 ? <NotResult title={props.titleMovie}/> : <CircularProgress />
              }
            </Grid>
        </Container>
      </main>
    </div>
  )
};

axios.defaults.withCredentials = true;


class Search extends Component {
  state = {
    movie: [],
    titleMovie: ''
  };

  static async getInitialProps({ query }) {
    return {
      title: query.title,
    }
  }

  keyPressEnterSearch = (ev) => {
    if (ev.key === 'Enter') {
      this.state.titleMovie = ev.target.value;
      this.getSimilarTitleMovie({movieTitle: ev.target.value});
      ev.preventDefault();
    }
  };

  HandleChangeSource = (ev) => {
    this.getSimilarTitleMovie({source: ev.target.value});
  };

  HandleChangeSort = (ev) => {
    this.getSimilarTitleMovie({sort: ev.target.value});
  };

  async getSimilarTitleMovie({movieTitle = this.state.titleMovie, source = 'popcorn', sort = 'title'}={}) {
    let responseData = [];

    if (movieTitle) {
      const response = await axios.get(`${API.movies_search}query=${encodeURIComponent(movieTitle)}&source=${source}&sort=${sort}`);
      responseData = response.data.movies;
    }
    else {
      const response = await axios.get(API.movie_hot);
      responseData = [...response.data.rankedMovies.popcorn, ...response.data.rankedMovies.yts];
    }

    this.setState({ movie: responseData, titleMovie: movieTitle})
  }

  async componentDidMount() {
    this.getSimilarTitleMovie({movieTitle: this.props.title});
  }

  render () {
    return (
      <SearchHome
        keyPressEnterSearch={this.keyPressEnterSearch}
        movie={this.state.movie}
        HandleChangeSource={this.HandleChangeSource}
        HandleChangeSort={this.HandleChangeSort}
        titleMovie={this.state.titleMovie}
      />
    )
  }
}

export default withAuthSync(Search);
