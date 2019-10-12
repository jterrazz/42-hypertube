import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CustomSearchInput from "../src/CustomSearchInput";

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
    background: "#F2F5F9"
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  BigAvatar: {
    width: 80,
    height: 80,
    marginTop: 40,
    marginBottom: 40
  },
  NavBar: {
    marginTop: 40,
    marginBottom: 40
  },
  listItem: {
    marginTop: 20,
    marginLeft: 20
  },
  Bigimg: {
    borderRadius : 10,
    height: 250
  },
  img: {
    borderRadius : 5,
    height: 250,
  },
  tab: {
    textTransform: 'none'
  },
  card: {
    maxWidth: 300,
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const data = [
    {
      src: 'https://themightyblog.fr/wp-content/uploads/2019/03/shazam-review-1024x576.jpg',
      title: 'Shazam!',
      type: ['Action', 'Fantasy'],
      views: '396,457',
      createdAt: '2019',
      review: '8.5'
    },{
      src: 'https://www.ecranlarge.com/media/cache/1600x1200/uploads/articles/000/000/000/alita-battle-angel-affiche-chinoise-1068754-large.jpg',
      title: 'Alita: Battle Angel',
      type: ['Adventure', 'Comedy'],
      views: '12,568',
      createdAt: '2018',
      review: '6.5'
    }
  ];

  const data_cover = [
    {
      src: 'https://blog.francetvinfo.fr/popup/files/2018/04/AVENGERS_INFINITY_120_PAYOFF_RVB-600x817.jpg',
      title: 'Avangers',
      type: ['Action', 'Fantasy'],
      views: '396,458',
      createdAt: '2017',
      review: '7.5'
    },{
      src: 'https://m.media-amazon.com/images/M/MV5BMjQ2ODIyMjY4MF5BMl5BanBnXkFtZTgwNzY4ODI2NzM@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
      title: 'Aladdin',
      type: ['Adventure', 'Comedy'],
      views: '12,568',
      createdAt: '2019',
      review: '6.5'
    },{
      src: 'http://fr.web.img3.acsta.net/c_215_290/pictures/18/12/03/08/53/5968896.jpg',
      title: 'Captain Marvel',
      type: ['Adventure', 'Comedy'],
      views: '49,568',
      createdAt: '2016',
      review: '5.5'
    },{
      src: 'http://fr.web.img2.acsta.net/c_215_290/pictures/18/11/15/09/12/3593965.jpg',
      title: 'Dumbo',
      type: ['Adventure', 'Comedy'],
      views: '4568',
      createdAt: '2019',
      review: '9.5'
    },{
      src: 'http://img.over-blog-kiwi.com/0/55/12/65/20190413/ob_52a0b0_hellboy-poster-bifff2019-717x1024.jpg',
      title: 'HellBoy',
      type: ['Adventure', 'Comedy'],
      views: '14,568',
      createdAt: '2018',
      review: '6.5'
    },{
      src: 'http://fr.web.img4.acsta.net/pictures/19/09/26/09/20/3002764.jpg',
      title: 'Joker',
      type: ['Adventure', 'Comedy'],
      views: '984,568',
      createdAt: '2019',
      review: '9.5'
    }
  ];

  const drawer = (
      <div>
        {/*<div className={classes.toolbar} />*/}
        <Grid
            className={classes.NavBar}
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
          <Typography variant="h4" gutterBottom>
            HyperTube
          </Typography>
          <Avatar alt="jterr" src="/static/avatar_example.jpeg" className={classes.BigAvatar} />
          <Typography variant="subtitle2" gutterBottom>
            Terrazzoni
            Jean-Baptiste
          </Typography>
          <Button color="primary">
            logout
          </Button>
        </Grid>
        <Divider />
        <List
            component="nav" aria-label="main mailbox folders"
            className={classes.listItem}
        >
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

  return (
      <div className={classes.root}>
        <AppBar
            position="fixed"
            className={classes.appBar}
            color={"default"}
            elevation={0}
        >
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
        <main className={classes.content} >
          <div className={classes.toolbar} />
          <Container fixed>
            <CustomSearchInput />
          </Container>
        </main>
      </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawer;