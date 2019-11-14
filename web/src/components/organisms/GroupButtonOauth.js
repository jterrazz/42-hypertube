import React from "react";
import Grid from '@material-ui/core/Grid'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo'
import { OauthURL } from "../../../utils/OauthURL";
import { BoxButtonOauth } from "../molecules/BoxButtonOauth";

export const GroupButtonOauth = () => {
  return (
    <Grid container justify="center">
      <BoxButtonOauth text="Facebook" icon={<FacebookIcon />} href={OauthURL.facebook}/>
      <BoxButtonOauth text="LinkedIn" icon={<LinkedInIcon />} href={OauthURL.linkedIn}/>
      <BoxButtonOauth text="Google" icon={<AccountBoxIcon />} href={OauthURL.google}/>
      <BoxButtonOauth text="Intra_42" icon={<PersonalVideoIcon />} href={OauthURL.intra_42}/>
    </Grid>
  )
};
