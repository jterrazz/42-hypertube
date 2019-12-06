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
import URL_Images from "../../services/online-assets";
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles(theme => ({
  img: {
    borderRadius: 5,
    height: 250,
  },
  card: {
    maxWidth: 300,
    position: 'relative',
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

export const CardPosterFilm = (item) => {
  const classes = useStyles();
  return (
    <Grid item xs={4} md={2}>
      <Card elevation={0} className={classes.card}>
        {item.played ? <VisibilityIcon className={classes.visibility}/> : ''}
        <Link href="/movie/[id]" as={`/movie/${item.imdb_id}`} prefetch={false}>
          <CardMedia title={item.title} image={item.poster_image && item.poster_image !== "images/posterholder.png" ? item.poster_image : URL_Images.poster} className={classes.img} style={{cursor:'pointer'}}/>
        </Link>
        <CardContent>
          <Link href="/movie/[id]" as={`/movie/${item.imdb_id}`} prefetch={false}>
          <Typography gutterBottom variant="subtitle2" component="h5" style={{cursor:'pointer'}}>
            {item.title}
          </Typography>
          </Link>
          <Box mb={1}>
            <Typography variant="caption" color="textSecondary">
              {item.release_date}
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
            {`${item.rating} (${item.runtime} min)`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
};
