import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {TypographyTitleG} from "../atoms/TypographyTitleG";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
  subtitle: {
    margin: theme.spacing(0.5),
  }
}));

export const FilmDescription = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={8}>
      <Paper className={classes.paper} elevation={0}>
        <TypographyTitleG text={props.movie.title}/>
        <Rating
          style={{ fontSize: 13 }}
          name="customized-empty"
          value={1}
          max={1}
          emptyIcon={<StarBorderIcon />}
        />
        <Typography variant="caption" color="textSecondary" className={classes.subtitle}>
          {`${props.movie.rating} (${props.movie.runtime} min)`}
        </Typography>
        <Box mb={1} mt={1}>
          <Typography variant="body2" color="textSecondary">
            {props.movie.release_date}
          </Typography>
        </Box>
        <Typography variant="caption" component="p">
          {props.movie.overview}
        </Typography>
      </Paper>
    </Grid>
  )
};
