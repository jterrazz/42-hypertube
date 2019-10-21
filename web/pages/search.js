import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import NavBar from "../src/NavBar";
import API from "../src/API";
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import Link from "../src/Link";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import Rating from "@material-ui/lab/Rating/Rating";
import StarBorderIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { withAuthSync } from '../utils/auth'

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
}
}));

const SearchHome = (props, {movie = null}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content} >
        <div className={classes.toolbar} />
        <Container fixed>
          <TextField
            id="search"
            label="Search"
            placeholder="Find Movies, TV Shows, ..."
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
            {props.movie ? props.movie.map((item, index) => (
              <Grid item xs={5} md={2} key={index}>
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
    </div>
  )
};

axios.defaults.withCredentials = true;

class Search extends Component {
  state = {
    movie: []
  };

  keyPressEnterSearch = (ev) => {
    if (ev.key === 'Enter') {
      this.getSimilarTitleMovie(ev.target.value);
      ev.preventDefault();
    }
  };

  async getSimilarTitleMovie(movieTitle) {
    let responseData = [];

    if (movieTitle) {
      const response = await axios.get(`${API.movies_search}query=${movieTitle}`);
      responseData = response.data.movies;
    }
    else {
      const response = await axios.get(API.movie_hot);
      responseData = [...response.data.rankedMovies.popcorn, ...response.data.rankedMovies.yts];
    }

    this.setState({ movie: responseData })
  }

  async componentDidMount() {
    const response = await axios.get(API.movie_hot);

    const responseData = [...response.data.rankedMovies.popcorn, ...response.data.rankedMovies.yts];

    this.setState({ movie: responseData })
  }

  render () {
    return (
      <SearchHome keyPressEnterSearch={this.keyPressEnterSearch} movie={this.state.movie}/>
    )
  }
}
export default withAuthSync(Search);