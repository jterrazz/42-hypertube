import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";

export const BoxError = (props, {text = null}) => {
 return (
   <Typography component="div" variant="body1">
     <Box textAlign="center" bgcolor="error.main" color="error.contrastText" p={2} m={1}>
       {props.text}
     </Box>
   </Typography>
 )
};
