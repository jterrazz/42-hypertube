import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Link from "next/link";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles(theme => ({
  BigImg: {
    borderRadius: 10,
    height: 250,
  },
  subtitle: {
    margin: theme.spacing(0.5),
  },
  visibility: {
    color: 'red',
    position: 'absolute',
    right: 0,
    paddingTop: 5,
    paddingRight: 5
  }
}));

export const CardFanartFilm = (props, film) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={6}>
      <Card elevation={0} style={{ position: 'relative' }}>
        {props.film.played ? <VisibilityIcon className={classes.visibility}/> : ''}
        <Link href="/movie/[id]" as={`/movie/${props.film.imdb_id}`} prefetch={false}>
          <CardMedia title={props.film.title} image={props.film.fanart_image} className={classes.BigImg} style={{cursor:'pointer'}} />
        </Link>
        <CardContent>
          <Link href="/movie/[id]" as={`/movie/${props.film.imdb_id}`} prefetch={false}>
            <Typography gutterBottom variant="h5" component="h2" style={{cursor:'pointer'}}>
              {props.film.title}
            </Typography>
          </Link>
          <Box mb={1}>
            <Typography variant="body2" color="textSecondary">
              {props.film.release_date}
            </Typography>
          </Box>
          <Rating
            style={{ fontSize: 13 }}
            name="customized-empty"
            value={1}
            max={1}
            emptyIcon={<StarBorderIcon />}
          />
          <Typography variant="caption" color="textSecondary" className={classes.subtitle}>
            {`${props.film.rating} (${props.film.runtime} min)`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
};
