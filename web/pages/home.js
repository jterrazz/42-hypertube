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
    padding: theme.spacing(3),
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
  img: {
    borderRadius : 10,
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
            <Typography variant="h6">
              Featured
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Discover our best picks
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Box my={5}>
                  <img
                    style={{ height: 200 }}
                    alt={data[0].title}
                    src={data[0].src}
                    className={ classes.img }
                  />
                  <Box paddingRight={2}>
                    <Typography gutterBottom variant="h6">
                      {data[0].title}
                    </Typography>
                    <Typography display="block" variant="caption" color="textSecondary">
                      {`${data[0].createdAt} • ${data[0].type[0]} | ${data[0].type[1]}`}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {`${data[0].review} (${data[0].views})`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box my={5}>
                  <img
                    style={{ height: 200 }}
                    alt={data[1].title}
                    src={data[1].src}
                    className={ classes.img }
                  />
                  <Box paddingRight={2}>
                    <Typography gutterBottom variant="h6">
                      {data[1].title}
                    </Typography>
                    <Typography display="block" variant="caption" color="textSecondary">
                      {`${data[1].createdAt} • ${data[1].type[0]} | ${data[1].type[1]}`}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {`${data[1].review} (${data[1].views})`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
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