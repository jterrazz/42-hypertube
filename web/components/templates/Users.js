import React from "react";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "../atoms/CircularProgress";
import { withTranslation } from "../../utils/i18n";
import { InputSearchUser } from "../atoms/InputSearchUser";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  Avatar: {
    width: 80,
    height: 80,
  },
  p: {
    wordBreak: 'break-all',
    whiteSpace: 'normal',
  }
}));

export const UsersTemplate = withTranslation()((props) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <Container fixed>
        <InputSearchUser {...props}/>
        <Grid container spacing={4} style={{ marginTop: 15 }}>
          {props.users ?
            <>
              {props.users.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper style={{background: '#F2F5F9'}}>
                    <List>
                      <ListItem style={{display: 'flex', justifyContent: "center"}}>
                        <ListItemAvatar>
                          <Avatar alt={item.username} src={item.profileImageUrl} className={classes.Avatar}/>
                        </ListItemAvatar>
                      </ListItem>
                      <ListItem>
                        <ListItemText secondary={props.t("userName")}/>
                        <ListItemText primary={<p className={classes.p}>{item.username}</p>} inset disableTypography/>
                      </ListItem>
                      <ListItem>
                        <ListItemText secondary={props.t("firstName")}/>
                        <ListItemText primary={<p className={classes.p}>{item.firstName}</p>} inset disableTypography/>
                      </ListItem>
                      <ListItem>
                        <ListItemText secondary={props.t("lastName")}/>
                        <ListItemText primary={<p className={classes.p}>{item.lastName}</p>} inset disableTypography/>
                      </ListItem>
                      <ListItem>
                        <ListItemText secondary={props.t("language")}/>
                        <ListItemText primary={<p className={classes.p}>{item.language}</p>} inset disableTypography/>
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

    </main>
  )
});
