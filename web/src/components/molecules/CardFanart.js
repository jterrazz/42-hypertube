import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import URL_Images from "../../../utils/BasicImage";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  media: {
    borderRadius : 10,
    height: 300,
  }
});

export const CardFanart = (props) => {
  const classes = useStyles();
  return (
    <>
      {props.movie && props.movie.fanart_image ?
        <CardMedia
          className={classes.media}
          image={props.movie.fanart_image !== 'https://image.tmdb.org/t/p/originalnull' ? props.movie.fanart_image : URL_Images.fanart}
          title={props.movie.title}
        />
        : ''}
    </>
  )
};
