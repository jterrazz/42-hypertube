import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Grid from "@material-ui/core/Grid";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  BigImg: {
    borderRadius: 10,
    height: 250,
  },
  subtitle: {
    margin: theme.spacing(0.5),
  }
}));

export const CardFanartFilm = (item) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={6}>
      <Card elevation={0}>
        <Link href={`/movie/${item.imdb_id}`}>
          <CardMedia title={item.title} image={item.fanart_image} className={classes.BigImg} />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.title}
          </Typography>
          <Box mb={1}>
            <Typography variant="body2" color="textSecondary">
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
