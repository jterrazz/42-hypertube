import NoScript from 'react-noscript';
import Grid from "@material-ui/core/Grid"
import { TypographyTitle } from "./TypographyTitle"

export const NonScript = () => {
  return (
    <NoScript>
      <Grid container justify="center">
        <Grid item>
          <div style={{paddingTop: 40, backgroudColor: 'orange', width: '100%'}}>
            <h1>Yikes!!!!</h1>
            <TypographyTitle text="It looks like this page does not have JavaScript enabled." />
          </div>
        </Grid>
      </Grid>
    </NoScript>
  )
};
