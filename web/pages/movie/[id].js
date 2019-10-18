import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar/Avatar'
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import PersonIcon from '@material-ui/icons/Person'
import CardMedia from '@material-ui/core/CardMedia'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite'
import { withRouter } from 'next/router'
import axios from "axios";
import API from "../../src/API";
import Card from "@material-ui/core/Card/Card";
import Link from "../../src/Link";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Rating from "@material-ui/lab/Rating/Rating";
import StarBorderIcon from "@material-ui/core/SvgIcon/SvgIcon";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: '#ffffff',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: '#F2F5F9',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  BigAvatar: {
    width: 80,
    height: 80,
    marginTop: 40,
    marginBottom: 40,
  },
  NavBar: {
    marginTop: 40,
    marginBottom: 40,
  },
  media: {
    borderRadius : 5,
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
  tab: {
    textTransform: 'none',
  },
  card: {
    maxWidth: 300,
  },
}));

const MovieComponent = (props, {movie = null, movieTorrent = null}) => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  };

  const drawer = (
    <div>
      {/*<div className={classes.toolbar} />*/}
      <Grid className={classes.NavBar} container direction="column" justify="center" alignItems="center">
        <Typography variant="h4" gutterBottom>
          HyperTube
        </Typography>
        <Avatar alt="jterr" src="/static/avatar_example.jpeg" className={classes.BigAvatar} />
        <Typography variant="subtitle2" gutterBottom>
          Terrazzoni Jean-Baptiste
        </Typography>
        <Button color="primary">logout</Button>
      </Grid>
      <Divider />
      <List component="nav" aria-label="main mailbox folders" className={classes.listItem}>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="My profile" />
        </ListItem>
      </List>
    </div>
  );

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
              <IconButton color="inherit" aria-label="More Options">
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
      <AppBar position="fixed" className={classes.appBar} color={'default'} elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
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
                  {/*24 avril 2019*/}
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
                    image={props.movie.fanart_image}
                    title={props.movie.title}
                  /> : ''}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h4">Similar</Typography>
                <Grid container spacing={4} style={{ marginTop: 15 }}>
                  {props.movie && props.movie.similar ? props.movie.similar.slice(0, 4).map((item, index) => (
                    <Grid item xs={4} md={3} key={index}>
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
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h4">Torrents</Typography>
                {props.movieTorrent ? Object.keys(props.movieTorrent).map((item) => (
                  <div key={item}>
                    <Box mt={3} mb={2}>
                      <Typography variant="subtitle2" color="textSecondary" style={{ textTransform: 'capitalize' }}>
                        {item}
                      </Typography>
                    </Box>
                    <TorrentComponent sourceTorrent={props.movieTorrent[item]} titleMovie={props.movie && props.movie.title? props.movie.title : ''}/>
                  </div>
                )) : ''}
              </Grid>
            </Grid>
          </Container>
        </main>
      : ''}
    </div>
  )
};

MovieComponent.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
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

    const responseDescription = await axios.get(`${API.movies}/${this.props.movieId}`);
    const responseTorrent = await axios.get(`${API.movies}/${this.props.movieId}/torrents`);

    const res = responseDescription.data;
    const resTorrent = responseTorrent.data;
    console.log(res);

    this.setState({ movie: res.movie , movieTorrent: resTorrent})
  }

  render () {
    return (
      <MovieComponent movie={this.state.movie} movieTorrent={this.state.movieTorrent}/>
    )
  }
}

export default withRouter(Movie);