import React from 'react'
import ReactPlayer from 'react-player'
import { makeStyles } from '@material-ui/core'
import ApiURL from '../../../utils/ApiURL'

const useStyle = makeStyles(() => ({
  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%' /* 720 / 1280 = 0.5625 */,
  },
  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

const Player = (props, {hash_movie = null, thumbnail = null, subtitles = null}) => {
  const classes = useStyle();

  return (
    <div className={classes.playerWrapper}>
      <ReactPlayer
        url={`${ApiURL.movies_stream}${props.hash_movie}/stream`}
        config={{ file:{
            attributes: {
            },
            tracks: props.subtitles }}
          }
        className={classes.reactPlayer}
        playing={false}
        width="100%"
        height="100%"
        controls={true}
        light={props.thumbnail}
      />
    </div>
  )
};

export default Player;
