import TextField from "@material-ui/core/TextField";
import React from "react";
import { makeStyles } from "@material-ui/core";
import {withTranslation} from '../../utils/i18n';

const useStyles = makeStyles({
  searchInput: {
    fontSize: 32
  }
});

export const InputSearchUser = withTranslation()((props) => {
  const classes = useStyles();

  return (
    <TextField
      id="search"
      label={props.t("Search")}
      placeholder={props.t("Find User")}
      fullWidth
      onChange={props.onChange}
      margin="normal"
      InputProps={{
        classes: {
          input: classes.searchInput,
        },
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
});
