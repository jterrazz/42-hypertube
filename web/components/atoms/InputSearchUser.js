import TextField from "@material-ui/core/TextField";
import React from "react";
import { makeStyles } from "@material-ui/core";
import {i18n} from '../../utils/i18n';

const useStyles = makeStyles({
  searchInput: {
    fontSize: 32
  }
});

export const InputSearchUser = (props) => {
  const classes = useStyles();
  return (
    <TextField
      id="search"
      label={i18n.t("Search")}
      placeholder={i18n.t("Find User")}
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
};
