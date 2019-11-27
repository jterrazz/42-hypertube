import TextField from "@material-ui/core/TextField";
import React from "react";
import { makeStyles } from "@material-ui/core";
import {i18n} from '../../utils/i18n';

const useStyles = makeStyles({
  searchInput: {
    fontSize: 32
  }
});

export const InputSearch = (props) => {
  const classes = useStyles();
  return (
    <TextField
      id="search"
      label={i18n.t("Search")}
      placeholder={i18n.t("Find Movies, TV Shows, ...")}
      fullWidth
      onKeyPress={props.keyPressEnterSearch}
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
