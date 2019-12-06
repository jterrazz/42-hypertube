import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {withTranslation} from '../../utils/i18n';

export const BoxError = withTranslation()((props) => {
 return (
   <Typography component="div" variant="body1">
     <Box textAlign="center" bgcolor="error.main" color="error.contrastText" p={2} m={1}>
       {props.t(props.text)}
     </Box>
   </Typography>
 )
});
