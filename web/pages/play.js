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
import Button from '@material-ui/core/Button'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import Player from "../src/Player";

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
  media: {
    // borderRadius : 10,
    height: 300
  },
  state: {
    color: "#EBBA16"
  },
  Paper: {
    padding: theme.spacing(1, 1),
    backgroundColor: "#FCFBFC",
    marginBottom: 15
  },
  play: {
    color: "#EBBA16",
    fontSize: 36
  },
  toolbarButtons: {
    marginLeft: "auto",
    marginRight: -12
  },
  player: {
    height: 500,
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
            <Grid>
              <Player className={classes.player} />
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