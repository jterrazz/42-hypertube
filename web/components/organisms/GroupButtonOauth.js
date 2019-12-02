import React from "react";
import Grid from '@material-ui/core/Grid';
import FacebookIcon from '@material-ui/icons/Facebook';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import GitHubIcon from '@material-ui/icons/GitHub';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo'
import { OauthURL } from "../../config/OauthURL";
import { BoxButtonOauth } from "../molecules/BoxButtonOauth";

export const GroupButtonOauth = () => {
  return (
    <Grid container justify="center">
      <BoxButtonOauth text="Facebook" icon={<FacebookIcon />} href={OauthURL.facebook}/>
      <BoxButtonOauth text="Github" icon={<GitHubIcon />} href={OauthURL.github}/>
      <BoxButtonOauth text="Google" icon={<AccountBoxIcon />} href={OauthURL.google}/>
      <BoxButtonOauth text="Intra_42" icon={<PersonalVideoIcon />} href={OauthURL.intra_42}/>
    </Grid>
  )
};
