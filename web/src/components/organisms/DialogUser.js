import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export const DialogUser = (props) => {
  return (
    <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle id="simple-dialog-title">Info Of @{props.userInfo ? props.userInfo.username : ''}</DialogTitle>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={props.userInfo.username} src={props.userInfo.profileImageUrl} />
          </ListItemAvatar>
          <ListItemText primary={props.userInfo.username} />
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
