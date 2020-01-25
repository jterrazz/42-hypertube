import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { TypographyTextSecondary } from "../atoms/TypographyTextSecondary";
import { makeStyles } from "@material-ui/core";
import URL_Images from "../../services/online-assets";

const useStyles = makeStyles({
  img: {
    borderRadius: 5,
    height: 250,
  },
  card: {
    maxWidth: 300,
  }
});

export const CardCasting = (props) => {
  const classes = useStyles();
  return (
    <Grid container spacing={4} style={{ marginTop: 15 }}>
      {props.movie.cast.slice(0, 4).map((item, index) => (
        <Grid item xs={4} md={3} key={index}>
          <Card elevation={0} className={classes.card}>
            <CardMedia
              title={item.character}
              image={item.profile_path !== 'https://image.tmdb.org/t/p/originalnull' ? item.profile_path : URL_Images.poster}
              className={classes.img}
              />
            <CardContent>
              <Typography gutterBottom variant="subtitle2" component="h5">
                {item.character}
              </Typography>
              <TypographyTextSecondary text={item.name}/>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
};
