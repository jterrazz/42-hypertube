import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  img: {
    height: 200,
  },
});

export const ImageSplitPage = () => {
  const classes = useStyles();
  return (
    <Grid item xs={false} sm={4} md={7}>
      <Grid container justify="flex-end" spacing={2}>
        <Grid item xs={4} md={3}>
          <CardMedia title="hot_1" image="/static/hot_1.jpg" className={classes.img} />
        </Grid>
      </Grid>
      <Grid container justify="flex-end" spacing={2}>
        <Grid item xs={4} md={3}>
          <CardMedia title="hot_2" image="/static/hot_2.jpg" className={classes.img} />
        </Grid>
        <Grid item xs={4} md={3}>
          <CardMedia title="hot_3" image="/static/hot_3.jpg" className={classes.img} />
        </Grid>
      </Grid>
      <Grid container justify="flex-end" spacing={2}>
        <Grid item xs={3} md={3} >
          <CardMedia title="hot_4" image="/static/hot_4.jpg" className={classes.img} />
        </Grid>
        <Grid item xs={3} md={3} >
          <CardMedia title="hot_4" image="/static/hot_5.jpg" className={classes.img} />
        </Grid>
        <Grid item xs={3} md={3} >
          <CardMedia title="hot_4" image="/static/hot_6.jpg" className={classes.img} />
        </Grid>
      </Grid>
    </Grid>
  )
};