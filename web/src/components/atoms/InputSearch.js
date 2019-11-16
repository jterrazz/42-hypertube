import TextField from "@material-ui/core/TextField";
import React from "react";
import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  searchInput: {
    fontSize: 32
  }
});

export const InputSearch = (props) => {
  const classes = useStyles();
  const [t] = useTranslation();
  return (
    <TextField
      id="search"
      label={t("Search")}
      placeholder={t("Find Movies, TV Shows, ...")}
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
