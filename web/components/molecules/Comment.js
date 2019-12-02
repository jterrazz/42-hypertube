import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Moment from "moment";
import React from "react";
import {withTranslation} from '../../utils/i18n';
import {makeStyles} from "@material-ui/core";
import {DialogUser} from "../organisms/DialogUser";
import { TypographyError } from "../atoms/TypographyError";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

export const Comment = withTranslation()((props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper className={classes.paper} elevation={0}>
        <TextField
          id="standard-input"
          className={classes.textField}
          margin="normal"
          fullWidth
          multiline
          value={props.commentaire}
          onChange={props.Change}
          rowsMax="4"
          placeholder={props.t("Add public comment ...")}
          error={Boolean(props.errorComment)}
        />
        {props.errorComment ? <TypographyError ErrorText={props.errorComment}/> : ''}
        <Grid container justify="flex-end">
          <Grid item xs={9} md={9}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              size="small"
              onClick={props.Click}
            >
              {props.t("Add comment")}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {props.comment ? props.comment.map((item, index) => (
        <Paper className={classes.paper} elevation={0} key={index}>
          <Typography variant="body2" color="textSecondary">
            <Button color="primary" value={item.user.username} onClick={ev => {handleClickOpen(); props.getUser(ev)}}>
              @{item.user.username}
            </Button>
             - {Moment(item.date).format('YYYY-MM-DD')}.
          </Typography>
          <Typography variant="body2">
            {item.text}
          </Typography>
        </Paper>
      )) : ''}
      <DialogUser userInfo={props.userInfo} open={open} onClose={handleClose} />
    </Grid>
  )
});
