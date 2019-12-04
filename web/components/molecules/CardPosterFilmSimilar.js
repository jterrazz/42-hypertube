import React from "react";
import Card from "@material-ui/core/Card";
import Link from "next/link";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Grid from "@material-ui/core/Grid";
import {makeStyles, useTheme} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles({
  img: {
    borderRadius: 5,
    height: 250,
  },
  card: {
    maxWidth: 300,
    position: 'relative',
  },
  visibility: {
    color: 'red',
    position: 'absolute',
    right: 0,
    paddingTop: 5,
    paddingRight: 5
  }
});

export const CardPosterFilmSimilar = (item) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid item xs={4} md={3}>
      <Card elevation={0} className={classes.card}>
        {item.played ? <VisibilityIcon className={classes.visibility}/> : ''}
        <Link href={`/search?title=${encodeURIComponent(item.title)}`} passHref prefetch={false}>
          <CardMedia title={item.title} image={item.poster_image} className={classes.img} />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="h5">
            {item.title}
          </Typography>
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
          <Typography variant="caption" color="textSecondary" style={{ margin: theme.spacing(0.5) }}>
            {`${item.rating}`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
};
