import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import axios from "axios";
import NavBar from "../src/NavBar";
import { withAuthSync } from '../utils/auth'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5, 10),
    backgroundColor: "#F8E5E9",
    borderRadius: 15,
    marginTop: 40,
  },
  welcome: {
    color: "#FF808B",
    marginBottom: 30,
  },
  main_profile: {
    backgroundColor: "#F6F4FC",
  },
}));

const ProfileComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content} >
        <div className={classes.toolbar} />
        <Container fixed>
          <Typography variant="h5">
            dashboard
          </Typography>
          <Paper className={classes.paper} elevation={0}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" component="h3" className={classes.welcome}>
                  Welcome back abbensid!
                </Typography>
                <Typography component="h4">
                  <div>Paper can be used to build surface</div>
                  <div>Or other elements for your application.</div>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <CardMedia
                  title="Vector"
                  image="/static/ilustracion-vector.png"
                  style={{ height: 150}}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </main>
    </div>
  )
};

axios.defaults.withCredentials = true;

class Profile extends Component {
  state = {
  };

  render () {
    return (
      <ProfileComponent />
    )
  }
}

export default withAuthSync(Profile);