import React from "react";
import ReactPlayer from "react-player";
import {makeStyles} from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%' /* 720 / 1280 = 0.5625 */
  },
  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  }
}));


const Player = () => {

  const classes = useStyle();

  return (
      <div className={classes.playerWrapper}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=-X4ikwUwxoE"
          className={classes.reactPlayer}
          playing={false}
          width="100%"
          height="100%"
          controls={true}
        />
      </div>
  )
};

export default Player;