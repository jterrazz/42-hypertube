import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  Avatar: {
    width: 80,
    height: 80,
  }
});

export const DialogUser = (props) => {
  const classes = useStyles();
  return (
    <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle id="simple-dialog-title">Info Of @{props.userInfo ? props.userInfo.username : ''}</DialogTitle>
      <List>
        <ListItem style={{display:'flex', justifyContent:"center"}}>
          <ListItemAvatar>
            <Avatar alt={props.userInfo.username} src={props.userInfo.profileImageUrl} className={classes.Avatar} />
          </ListItemAvatar>
        </ListItem>
        <ListItem>
          <ListItemText secondary="firstName: "/>
          <ListItemText primary={props.userInfo.firstName} />
        </ListItem>
        <ListItem>
          <ListItemText secondary="lastName: "/>
          <ListItemText primary={props.userInfo.lastName} />
        </ListItem>
      </List>
    </Dialog>
  )
};
