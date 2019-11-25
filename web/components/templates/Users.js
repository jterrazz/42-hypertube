import React from "react";
import NavBar from "../organisms/NavBar";
import { makeStyles } from "@material-ui/core";
import Copyright from "../atoms/Copyright";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "../atoms/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  Avatar: {
    width: 80,
    height: 80,
  }
}));

export const User = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Container fixed>
          <Grid container spacing={4} style={{ marginTop: 15 }}>
            {props.users ?
              <>
                {props.users.map((item, index) => (
                  <Grid item xs={4} md={4} key={index}>
                    <Paper style={{background: '#F2F5F9'}}>
                      <List>
                        <ListItem style={{display: 'flex', justifyContent: "center"}}>
                          <ListItemAvatar>
                            <Avatar alt={item.username} src={item.profileImageUrl} className={classes.Avatar}/>
                          </ListItemAvatar>
                        </ListItem>
                        <ListItem>
                          <ListItemText secondary="userName: "/>
                          <ListItemText primary={item.username}/>
                        </ListItem>
                        <ListItem>
                          <ListItemText secondary="firstName: "/>
                          <ListItemText primary={item.firstName}/>
                        </ListItem>
                        <ListItem>
                          <ListItemText secondary="lastName: "/>
                          <ListItemText primary={item.lastName}/>
                        </ListItem>
                        <ListItem>
                          <ListItemText secondary="language: "/>
                          <ListItemText primary={item.language}/>
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                ))}
              </>
              :
              <CircularProgress/>
            }

          </Grid>
        </Container>

        <Copyright />
      </main>
    </div>
  )
};
