import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import React from "react";

function Copyright() {
  return (
    <footer>
      <Typography variant="body2" color="textSecondary" align="center" style={{ margin: 15 }}>
        {'Copyright © '}
        <MuiLink color="inherit" href="https://intra.42.fr/">
          HyperTube
        </MuiLink>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>
  )
}

export default Copyright;
