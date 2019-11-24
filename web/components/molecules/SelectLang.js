import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
    margin: theme.spacing(1, 0, 1),
  }
}));

export const SelectLang = (props) => {
  const { values: { language } } = props;

  const handleChangeSelect = (event) => {
    setLanguage(event.target.value);
    props.values.language = event.target.value;
  };
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [lang, setLanguage] = React.useState(language);
  const [open, setOpen] = React.useState(false);

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>Language</InputLabel>
      <Select
        style={{ background: "white" }}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={lang}
        onChange={handleChangeSelect}
        inputProps={{
          name: 'language',
          id: 'controlled-open-select',
        }}
      >
        <MenuItem value="fr-FR">Français</MenuItem>
        <MenuItem value="en-US">Anglais</MenuItem>
      </Select>
    </FormControl>
  )
};
