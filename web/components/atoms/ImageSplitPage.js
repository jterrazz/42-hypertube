import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  img: {
    height: 200,
  },
  card: {
    maxWidth: 150,
  }
});

export const ImageSplitPage = () => {
  const classes = useStyles();
  return (
    <Grid item xs={false} sm={4} md={7}>
      <Grid container justify="flex-end" spacing={2}>
        <Grid item xs={4} md={3} className={classes.card}>
          <CardMedia title="hot_1" image="/static/images/hot_1.jpg" className={classes.img} />
        </Grid>
      </Grid>
      <Grid container justify="flex-end" spacing={2}>
        <Grid item xs={4} md={3} className={classes.card}>
          <CardMedia title="hot_2" image="/static/images/hot_2.jpg" className={classes.img} />
        </Grid>
        <Grid item xs={4} md={3} className={classes.card}>
          <CardMedia title="hot_3" image="/static/images/hot_3.jpg" className={classes.img} />
        </Grid>
      </Grid>
      <Grid container justify="flex-end" spacing={2}>
        <Grid item xs={3} md={3} className={classes.card}>
          <CardMedia title="hot_4" image="/static/images/hot_4.jpg" className={classes.img} />
        </Grid>
        <Grid item xs={3} md={3} className={classes.card}>
          <CardMedia title="hot_4" image="/static/images/hot_5.jpg" className={classes.img} />
        </Grid>
        <Grid item xs={3} md={3} className={classes.card}>
          <CardMedia title="hot_4" image="/static/images/hot_6.jpg" className={classes.img} />
        </Grid>
      </Grid>
    </Grid>
  )
};
