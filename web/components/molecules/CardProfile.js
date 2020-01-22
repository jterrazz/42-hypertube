import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import React from "react";
import {makeStyles} from "@material-ui/core";
import {withTranslation} from '../../utils/i18n';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5, 10),
    backgroundColor: "#F8E5E9",
    borderRadius: 15,
    marginTop: 40,
    marginBottom: 40,
  },
  welcome: {
    color: "#FF808B",
    marginBottom: 30,
  }
}));

export const CardProfile = withTranslation()((props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h3" className={classes.welcome}>
            {!props.me.profileCompleted ?
              <>
                <p>{props.t('Complete your profile and use platform')}</p>
                {!props.me.profileImageUrl ? <li>{props.t('Add a profile picture *')}</li> : ''}
                {!props.me.username ? <li>{props.t('Set your profile info *')}</li> : ''}
                {props.me.noPassword ? <li>{props.t('Add your password (optional)')}</li> : ''}
              </>
                :
              <>{props.t("Welcome back")} {props.username}!</>
            }
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardMedia
            title="Vector"
            image="/static/images/ilustracion-vector.png"
            style={{height: 150}}
          />
        </Grid>
      </Grid>
    </Paper>
  )
});
