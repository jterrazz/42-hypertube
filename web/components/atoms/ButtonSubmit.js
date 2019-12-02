import {withTranslation} from '../../utils/i18n';
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const ButtonSubmit = withTranslation()((props) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      {props.t(props.text)}
    </Button>
  )
});
