import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import React from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://intra.42.fr/">
        HyperTube
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright;
