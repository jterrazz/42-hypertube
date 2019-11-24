import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const ButtonSubmit = (props) => {
  const classes = useStyles();
  const [t] = useTranslation();
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      {t(props.text)}
    </Button>
  )
};
