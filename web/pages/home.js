import React, { Component } from 'react'
import axios from 'axios'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Button from "@material-ui/core/Button/Button";
import Divider from "@material-ui/core/Divider/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Drawer from "@material-ui/core/Drawer/Drawer";
import Container from "@material-ui/core/Container/Container";
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Box from "@material-ui/core/Box/Box";
import Rating from "@material-ui/lab/Rating/Rating";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import {makeStyles, useTheme} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'
import PersonIcon from '@material-ui/icons/Person'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import API from '../src/API'

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
  listItem: {
    marginTop: 20,
    marginLeft: 20,
  },
  Bigimg: {
    borderRadius: 10,
    height: 250,
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

const HomeComponent = (props, {movie = null}) => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  };

  const drawer = (
    <div>
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
      <List className={classes.listItem}>
        {/*<ListItem button>*/}
          {/*<ListItemIcon>*/}
            {/*<HomeIcon />*/}
          {/*</ListItemIcon>*/}
          {/*<ListItemText primary="Home" />*/}
        {/*</ListItem>*/}
        {/*<ListItem button>*/}
          {/*<ListItemIcon>*/}
            {/*<SearchIcon />*/}
          {/*</ListItemIcon>*/}
          {/*<ListItemText primary="Search" />*/}
        {/*</ListItem>*/}
        {/*<ListItem button>*/}
          {/*<ListItemIcon>*/}
            {/*<PersonIcon />*/}
          {/*</ListItemIcon>*/}
          {/*<ListItemText primary="My profile" />*/}
        {/*</ListItem>*/}
      </List>
    </div>
  );

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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container fixed>
          <Typography variant="h6">Featured</Typography>
          <Typography variant="body2" color="textSecondary">
            Discover our best picks
          </Typography>
          <Grid container spacing={5} style={{ marginTop: 15 }}>
            {props.movie && props.movie.popcorn ? props.movie.popcorn.slice(0, 2).map((item, index) => (
              <Grid key={index} item xs={12} md={6}>
                <Card elevation={0}>
                  <CardActionArea>
                    <CardMedia title={item.title} image={item.fanart_image} className={classes.Bigimg} />
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
                      <Typography variant="caption" color="textSecondary" style={{ margin: theme.spacing(0.5) }}>
                        {`${item.rating} (${item.runtime} min)`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )) : 'loading' }
          </Grid>
          <Box mt={2}>
            <Typography variant="h6">
              Yts
            </Typography>
          </Box>
          <Grid container spacing={4} style={{ marginTop: 15 }}>
            {props.movie && props.movie.yts ? props.movie.yts.slice(0, 6).map((item, index) => (
              <Grid item xs={4} md={2} key={index}>
                <Card elevation={0} className={classes.card}>
                  <CardActionArea>
                    <CardMedia title={item.title} image={item.poster_image} className={classes.img} />
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
                  </CardActionArea>
                </Card>
              </Grid>
            )) : 'loading'}
          </Grid>
          <Box mt={2}>
            <Typography variant="h6">
              Popcorn
            </Typography>
          </Box>
          <Grid container spacing={4} style={{ marginTop: 15 }}>
            {props.movie && props.movie.popcorn ? props.movie.popcorn.slice(0, 6).map((item, index) => (
              <Grid item xs={4} md={2} key={index}>
                <Card elevation={0} className={classes.card}>
                  <CardActionArea>
                    <CardMedia title={item.title} image={item.poster_image} className={classes.img} />
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
                  </CardActionArea>
                </Card>
              </Grid>
            )) : 'loading'}
          </Grid>
        </Container>
      </main>
    </div>
  )
};

axios.defaults.withCredentials= true;

class Home extends Component {
  state = {
    movie: []
  };

  async componentDidMount() {
    const response = await axios.get(API.movie_hot);

    const res = response.data.rankedMovies;

    this.setState({ movie: res })
  }

  render () {
    return (
      this.state.movie !== null ? <HomeComponent movie={this.state.movie}/> : null
    )
  }
}
export default Home