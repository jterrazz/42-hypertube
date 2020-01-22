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
import {withTranslation} from '../../utils/i18n';
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
    marginBottom: 40,
    border: '3px solid #556cd6',
  },
  NavBar: {
    marginTop: 40,
    marginBottom: 40
  },
  listItem: {
    marginTop: 20,
    marginLeft: 20
  },
  p: {
    wordBreak: 'break-all',
    whiteSpace: 'normal',
    marginLeft: 5,
    marginRight: 5
  },
  title: {
    fontWeight: 'bold',
    display: 'inline',
    color: theme.palette.primary.main
  }
}));

const NavBar = withTranslation()((props) => {
  const {container} = props;
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
          <p style={{ display: 'inline'}}>Hyper</p>
          <p className={classes.title}>Tube</p>
        </Typography>
        {props.me ?
          <>
            <Avatar alt={props.me.username} src={props.me.profileImageUrl}
                    className={classes.Avatar}/>
            <Typography variant="subtitle2" gutterBottom align="center">
              <p className={classes.p}>{props.me.firstName} {props.me.lastName}</p>
            </Typography>
          </>
          : ''}
        <Button
          onClick={props.logout}
          color="primary"
        >
          {props.t("logout")}
        </Button>
      </Grid>
      <Divider/>
      <List
        component="nav" aria-label="main mailbox folders"
        className={classes.listItem}
      >
        <Link href="/" passHref prefetch={false}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary={props.t("Home")}/>
          </ListItem>
        </Link>

        <Link href="/search" passHref prefetch={false}>
          <ListItem button>
            <ListItemIcon>
              <SearchIcon/>
            </ListItemIcon>
            <ListItemText primary={props.t("Search")}/>
          </ListItem>
        </Link>

        <Link href="/profile" passHref prefetch={false}>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon/>
            </ListItemIcon>
            <ListItemText primary={props.t("My profile")}/>
          </ListItem>
        </Link>

        <Link href="/torrent" passHref prefetch={false}>
          <ListItem button>
            <ListItemIcon>
              <SystemUpdateAltIcon/>
            </ListItemIcon>
            <ListItemText primary="Torrent"/>
          </ListItem>
        </Link>

        <Link href="/users" passHref prefetch={false}>
          <ListItem button component="a">
            <ListItemIcon>
              <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary={props.t("Users")}/>
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
})

class Bar extends Component {

  logout = () => {
    this.props.dispatch(logout)
      .then(() => Router.push('/'))
      .catch(_ => {})
  }

  render() {
    return (
      <header>
        <NavBar me={this.props.me} logout={this.logout}/>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  me: state.auth.user
})

export default connect(mapStateToProps)(Bar);
