import Grid from "@material-ui/core/Grid/Grid";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

export const ImageSplitPage = () => {
  const classes = useStyles();
  return (
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
  )
};
