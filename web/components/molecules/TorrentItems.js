import React from "react";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite'
import {makeStyles} from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  state: {
    color: '#EBBA16',
  },
  Paper: {
    padding: theme.spacing(1, 1),
    backgroundColor: '#FCFBFC',
    marginBottom: 15,
  },
  play: {
    color: '#EBBA16',
    fontSize: 36,
  },
  toolbarButtons: {
    marginLeft: 'auto',
    marginRight: -12,
  }
}));

export const TorrentItems = (props) => {
  const classes = useStyles();

  return (
    <>
      {props.sourceTorrent ? props.sourceTorrent.map((item, index) => (
        <Paper key={index} className={classes.Paper} elevation={0}>
          <Toolbar>
            <Box mr={2}>
              <Typography variant="h6">{`${item.size}`}</Typography>
            </Box>
            <Typography variant="subtitle1">
              <div>
                <Typography variant="subtitle1">{props.titleMovie} - Torrent {index + 1}</Typography>
              </div>
              <div>
                <Typography component="p" className={classes.state}>
                  {`${item.seeds} seeds - ${item.peers} peers`}
                </Typography>
              </div>
            </Typography>
            <span className={classes.toolbarButtons}>
              <Link href={`/play?hash=${item.hash}&id=${props.movieId}`} passHref prefetch={false}>
                <IconButton color="inherit" aria-label="More Options">
                  <PlayCircleFilledWhiteIcon className={classes.play}/>
                </IconButton>
              </Link>
            </span>
          </Toolbar>
        </Paper>
      )) : ''}
    </>
  )
};
