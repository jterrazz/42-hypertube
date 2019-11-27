import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Home as HomeIcon, Search as SearchIcon} from '@material-ui/icons';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import {withTranslation, i18n} from '../../utils/i18n';
import {useTranslation} from 'react-i18next';
import Link from "next/link";
import {connect} from "react-redux";
import Router from "next/router";
import {logout} from '../../store/actions/auth'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
  drawerPaper: {
    width: drawerWidth,
    background: "#F2F5F9"
  },
  Avatar: {
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
}));

// TODO Replace all by <Link>
const NavBar = (props) => {
  const {container, t} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
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
        {props.me ?
          <>
            <Avatar alt={props.me.username} src={props.me.profileImageUrl}
                    className={classes.Avatar}/>
            <Typography variant="subtitle2" gutterBottom>
              {props.me.firstName} {props.me.lastName}
            </Typography>
          </>
          : ''}
        <Button
          onClick={props.logout}
          color="primary"
        >
          {t("logout")}
        </Button>
      </Grid>
      <Divider/>
      <List
        component="nav" aria-label="main mailbox folders"
        className={classes.listItem}
      >
        <Link href="/" passHref>
          <ListItem button component="a">
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary={t("Home")}/>
          </ListItem>
        </Link>
        <ListItem button component="a" href="/search">
          <ListItemIcon>
            <SearchIcon/>
          </ListItemIcon>
          <ListItemText primary={t("Search")}/>
        </ListItem>
        <ListItem button component="a" href="/profile">
          <ListItemIcon>
            <PersonIcon/>
          </ListItemIcon>
          <ListItemText primary={t("My profile")}/>
        </ListItem>
        <ListItem button component="a" href="/torrent">
          <ListItemIcon>
            <SystemUpdateAltIcon/>
          </ListItemIcon>
          <ListItemText primary="Torrent"/>
        </ListItem>
        <Link href="/users" passHref>
          <ListItem button component="a">
            <ListItemIcon>
              <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary={t("Users")}/>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
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
            <MenuIcon/>
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
    </div>
  );
}

class Bar extends Component {

  logout = () => {
    this.props.dispatch(logout)
      .then(() => Router.push('/'))
      .catch(_ => {})
  }

  render() {
    return (
      <NavBar me={this.props.me} logout={this.logout} t={this.props.t}/>
    )
  }
}

const mapStateToProps = state => ({
  me: state.auth.user
})

export default connect(mapStateToProps)(withTranslation('common')(Bar));
