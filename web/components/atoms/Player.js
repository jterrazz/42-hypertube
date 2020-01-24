import React from 'react'
import ReactPlayer from 'react-player'
import { makeStyles } from '@material-ui/core'

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

const Player = (props, {hashMovie = null, thumbnail = null, subtitles = null, onStart = null, url = null}) => {
  const classes = useStyle();

  return (
    <div className={classes.playerWrapper}>
      <ReactPlayer
        url={props.url}
        controls={true}
        config={{
          file: {
            tracks: props.subtitles || [],
            attributes: {
              controlsList: 'nodownload'
            }
          }
        }}
        className={classes.reactPlayer}
        playing={false}
        width="100%"
        height="100%"
        onStart={props.onStart}
        light={props.thumbnail}
      />
    </div>
  )
};

export default Player;
