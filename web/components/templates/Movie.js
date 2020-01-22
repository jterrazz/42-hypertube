import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {CardFanart} from "../molecules/CardFanart";
import {CardPosterFilmSimilar} from "../molecules/CardPosterFilmSimilar";
import Box from "@material-ui/core/Box";
import {TorrentItems} from "../molecules/TorrentItems";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core";
import {withTranslation} from '../../utils/i18n';
import {Error404} from "../molecules/Error404";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  media: {
    borderRadius : 10,
    height: 300,
  }
}));

export const Movie = withTranslation()((props) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {props.movie ?
        <>
          {props.movie.title ?
            <Container fixed>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>

                  <Typography variant="h2" gutterBottom>
                    {props.movie && props.movie.title ? props.movie.title : ''}
                  </Typography>

                  <Typography variant="h4" gutterBottom color="textSecondary">
                    {props.movie && props.movie.release_date ? props.movie.release_date : ''}
                  </Typography>

                  <Typography variant="body2" gutterBottom color="textPrimary">
                    {props.movie && props.movie.overview ? props.movie.overview : ''}
                  </Typography>


                </Grid>

                <Grid item xs={12} md={6}>
                  <CardFanart {...props}/>
                </Grid>

                {props.movie && props.movie.similar && props.movie.similar.length > 0 ?
                  <Grid item xs={12} md={6}>
                    <Typography variant="h4">{props.t("Similar")}</Typography>
                    <Grid container spacing={4} style={{marginTop: 15}}>
                      {props.movie.similar.slice(0, 4).map((item, index) => (
                        <CardPosterFilmSimilar {...item} key={index}/>
                      ))}
                    </Grid>
                  </Grid>
                  : ''}

                <Grid item xs={12} md={6}>
                  <Typography variant="h4">Torrents</Typography>
                  {props.movieTorrent ? Object.keys(props.movieTorrent).map((item) => (
                    <div key={item}>
                      {props.movieTorrent[item] ?
                        <div key={item}>
                          <Box mt={3} mb={2}>
                            <Typography variant="subtitle2" color="textSecondary" style={{textTransform: 'capitalize'}}>
                              {item}
                            </Typography>
                          </Box>
                          <TorrentItems sourceTorrent={props.movieTorrent[item]}
                                        titleMovie={props.movie && props.movie.title ? props.movie.title : ''}
                                        movieId={props.movie.imdb_id}/>
                        </div>
                        : ''}
                    </div>
                  )) : ''}
                </Grid>

              </Grid>
            </Container>
            :
            <Grid
              container
              justify="center"
            >
              <Grid item>
                <CircularProgress/>
              </Grid>
            </Grid>
          }
        </>
        :
        <Error404 />
      }
    </main>
  )
});
