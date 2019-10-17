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

const HomeComponent = (props) => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // const [value, setValue] = React.useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue)
  // };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  };

  const data = [
    {
      src: 'https://themightyblog.fr/wp-content/uploads/2019/03/shazam-review-1024x576.jpg',
      title: 'Shazam!',
      type: ['Action', 'Fantasy'],
      views: '396,457',
      createdAt: '2019',
      review: '8.5',
    },
    {
      src:
        'https://www.ecranlarge.com/media/cache/1600x1200/uploads/articles/000/000/000/alita-battle-angel-affiche-chinoise-1068754-large.jpg',
      title: 'Alita: Battle Angel',
      type: ['Adventure', 'Comedy'],
      views: '12,568',
      createdAt: '2018',
      review: '6.5',
    },
  ];

  const data_cover = [
    {
      src: 'https://blog.francetvinfo.fr/popup/files/2018/04/AVENGERS_INFINITY_120_PAYOFF_RVB-600x817.jpg',
      title: 'Avangers',
      type: ['Action', 'Fantasy'],
      views: '396,458',
      createdAt: '2017',
      review: '7.5',
    },
    {
      src:
        'https://m.media-amazon.com/images/M/MV5BMjQ2ODIyMjY4MF5BMl5BanBnXkFtZTgwNzY4ODI2NzM@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
      title: 'Aladdin',
      type: ['Adventure', 'Comedy'],
      views: '12,568',
      createdAt: '2019',
      review: '6.5',
    },
    {
      src: 'http://fr.web.img3.acsta.net/c_215_290/pictures/18/12/03/08/53/5968896.jpg',
      title: 'Captain Marvel',
      type: ['Adventure', 'Comedy'],
      views: '49,568',
      createdAt: '2016',
      review: '5.5',
    },
    {
      src: 'http://fr.web.img2.acsta.net/c_215_290/pictures/18/11/15/09/12/3593965.jpg',
      title: 'Dumbo',
      type: ['Adventure', 'Comedy'],
      views: '4568',
      createdAt: '2019',
      review: '9.5',
    },
    {
      src: 'http://img.over-blog-kiwi.com/0/55/12/65/20190413/ob_52a0b0_hellboy-poster-bifff2019-717x1024.jpg',
      title: 'HellBoy',
      type: ['Adventure', 'Comedy'],
      views: '14,568',
      createdAt: '2018',
      review: '6.5',
    },
    {
      src: 'http://fr.web.img4.acsta.net/pictures/19/09/26/09/20/3002764.jpg',
      title: 'Joker',
      type: ['Adventure', 'Comedy'],
      views: '984,568',
      createdAt: '2019',
      review: '9.5',
    },
  ];

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
            {/*{props.movie.yts}*/}
          </Typography>
          <Grid container spacing={5} style={{ marginTop: 15 }}>
            {props.movie.yts.slice(0, 2).map((item, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <Card elevation={0}>
                  <CardActionArea>
                    <CardMedia title={item.title} image={item.fanart_image} className={classes.Bigimg} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                      </Typography>
                      <Box mb={1}>
                        <Typography variant="body2" color="textSecondary">
                          {`${item.year} • ${item.genres[0]} | ${item.genres[1]}`}
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
            ))}
          </Grid>
          <Box mt={2}>
            <Typography variant="h6">Browse by category</Typography>
          </Box>
          {/*<Grid container>*/}
            {/*<Tabs*/}
              {/*value={value}*/}
              {/*indicatorColor="primary"*/}
              {/*textColor="primary"*/}
              {/*onChange={handleChange}*/}
              {/*aria-label="disabled tabs example"*/}
            {/*>*/}
              {/*<Tab label="Action" className={classes.tab} />*/}
              {/*<Tab label="Adventure" className={classes.tab} />*/}
              {/*<Tab label="Fantasy" className={classes.tab} />*/}
              {/*<Tab label="Romance" className={classes.tab} />*/}
            {/*</Tabs>*/}
          {/*</Grid>*/}
          <Grid container spacing={4} style={{ marginTop: 15 }}>
            {data_cover.map((item, index) => (
              <Grid item xs={3} sm={2} key={index}>
                <Card elevation={0} className={classes.card}>
                  <CardActionArea>
                    <CardMedia title={item.title} image={item.src} className={classes.img} />
                    <CardContent>
                      <Typography gutterBottom variant="subtitle2" component="h5">
                        {item.title}
                      </Typography>
                      <Box mb={1}>
                        <Typography variant="caption" color="textSecondary">
                          {`${item.createdAt} • ${item.type[0]} | ${item.type[1]}`}
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
                        {`${item.review} (${item.views})`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
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
    const response = await axios.get('http://localhost:3000/movies/hot');

    console.log("popcorn");
    console.log(response.data.rankedMovies.popcorn[1]);
    console.log("yts");
    console.log(response.data.rankedMovies.yts[0]);

    const res = response.data.rankedMovies;

    console.log(res);

    this.setState({ movie: res })
  }

  render () {
    return (
      this.state.movie !== null ? <HomeComponent movie={this.state.movie}/> : null
    )
  }
}
export default Home