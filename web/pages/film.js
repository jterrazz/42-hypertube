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
import CardMedia from '@material-ui/core/CardMedia'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';


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

}));

const data_torrent = [
  {
    title: 'The Avangers Cam Version, but the best of these still.',
    seeder: '396',
    leecher: '201',
    size: '8.5'
  },{
    title: 'The Avangers (2012) CAM NL subs DutchReleaseTeam',
    seeder: '6',
    leecher: '2',
    size: '6.5'
  }
];

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
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h2" gutterBottom>
                  Avengers: Endgame
                </Typography>
                <Typography variant="h4" gutterBottom color="textSecondary">
                  24 avril 2019
                </Typography>
                <Typography variant="body2" gutterBottom color="textPrimary">
                  Le Titan Thanos, ayant réussi à s'approprier les six Pierres d'Infinité et à les réunir sur le Gantelet doré, a pu réaliser son objectif de pulvériser la moitié de la population de l'Univers. Cinq ans plus tard, Scott Lang, alias Ant-Man, parvient à s'échapper de la dimension subatomique où il était coincé. Il propose aux Avengers une solution pour faire revenir à la vie tous les êtres disparus, dont leurs alliés et coéquipiers : récupérer les Pierres d'Infinité dans le passé.
                </Typography>

              </Grid>
              <Grid item xs={12} md={6}>
                <CardMedia
                  className={classes.media}
                  image="https://media.melty.fr/article-3996373-head-f5/avengers-endgame-avengers.jpg"
                  title="avangers"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4">
                  Torrents
                </Typography>
                <Box mt={3} mb={2}>
                  <Typography variant="body1" color="textSecondary">
                    ThePirateBay
                  </Typography>
                </Box>
                { data_torrent.map((item, index) => (
                  <Paper
                    key={index}
                    className={classes.Paper}
                    elevation={0}
                    >
                    <Toolbar>
                      <Box mr={2}>
                        <Typography variant="h6">
                          {`${item.size}go`}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle1">
                        <div>
                          <Typography variant="subtitle1">
                            {item.title}
                          </Typography>
                        </div>
                        <div>
                          <Typography component="p" className={classes.state}>
                            {`${item.seeder} seeder - {${item.leecher} leecher`}
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
                ))}
                <Box mt={3} mb={2}>
                  <Typography variant="body1" color="textSecondary">
                    KickassTorrente
                  </Typography>
                </Box>
                  { data_torrent.map((item, index) => (
                    <Paper
                        key={index}
                        className={classes.Paper}
                        elevation={0}
                    >
                      <Toolbar>
                        <Box mr={2}>
                          <Typography variant="h6">
                            {`${item.size}go`}
                          </Typography>
                        </Box>
                        <Typography variant="subtitle1">
                          <div>
                            <Typography variant="subtitle1">
                              {item.title}
                            </Typography>
                          </div>
                          <div>
                            <Typography component="p" className={classes.state}>
                              {`${item.seeder} seeder - {${item.leecher} leecher`}
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
                  ))}
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