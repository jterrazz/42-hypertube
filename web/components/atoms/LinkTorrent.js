import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import React from "react";

export const LinkTorrent = () => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="torrent_movie">WebTorrent</InputLabel>
      <OutlinedInput
        startAdornment={<InputAdornment position="start">magnet:</InputAdornment>}
        labelWidth={60}
      />
    </FormControl>
  )
};
