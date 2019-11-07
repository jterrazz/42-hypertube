import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from "@material-ui/core/Grid/Grid";
import {Field} from "formik";
import CustomImageInput from "./CustomImageInput";
import {BoxError} from "./ErrorMessage";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    // margin: theme.spacing(1),
    width: '100%',
    margin: theme.spacing(1, 0, 1),
  },
}));



const Form = (props, error) => {
  const {
    values: { firstName, lastName, email, language },
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = props;

  const classes = useStyles();
  const [lang, setLanguage] = React.useState(language);
  const [open, setOpen] = React.useState(false);

  const [t, i18n] = useTranslation();

  const handleChangeSelect = (event) => {
    setLanguage(event.target.value);
    props.values.language = event.target.value;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {props.error ? <BoxError text={props.error}/> : ''}
      <TextField
        autoComplete="fname"
        margin="normal"
        name="firstName"
        variant="outlined"
        required
        fullWidth
        id="firstName"
        label={t("First Name")}
        value={firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.firstName ? errors.firstName : ''}
        error={touched.firstName && Boolean(errors.firstName)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="lastName"
        label={t("Last Name")}
        name="lastName"
        autoComplete="lname"
        value={lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.lastName ? errors.lastName : ''}
        error={touched.lastName && Boolean(errors.lastName)}
        />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label={t("Email Address")}
        name="email"
        autoComplete="email"
        value={email}
        onChange={e => {handleChange(e); props.onChange()}}
        onBlur={handleBlur}
        helperText={touched.email ? errors.email : ''}
        error={touched.email && Boolean(errors.email) || Boolean(props.error)}
      />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="controlled-open-select">Language</InputLabel>
        <Select
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

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {t("save")}
      </Button>
    </form>
  );
};

export default Form;
