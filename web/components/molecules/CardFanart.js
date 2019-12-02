import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import URL_Images from "../../services/online-assets";
import {makeStyles} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles({
  media: {
    borderRadius : 10,
    height: 300,
  },
  visibility: {
    color: 'red',
    position: 'absolute',
    right: 0,
    paddingTop: 5,
    paddingRight: 5
  }
});

export const CardFanart = (props) => {
  const classes = useStyles();
  return (
    <>
      {props.movie && props.movie.fanart_image ?
        <div style={{ position: 'relative' }}>
          {props.movie.played ? <VisibilityIcon className={classes.visibility}/> : ''}
          <CardMedia
            className={classes.media}
            image={props.movie.fanart_image !== 'https://image.tmdb.org/t/p/originalnull' ? props.movie.fanart_image : URL_Images.fanart}
            title={props.movie.title}
          />
        </div>
        : ''}
    </>
  )
};
