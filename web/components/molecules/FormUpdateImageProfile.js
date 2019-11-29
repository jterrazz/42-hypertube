import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import {Field} from "formik";
import CustomImageInput from "./CustomImageInput";
import {i18n} from '../../utils/i18n';
import {BoxError} from "./ErrorMessage";

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));



const FormUpdateImgae = (props) => {
  const {
    values: { profileImage },
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = props;

  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {props.error ? <BoxError text={i18n.t(props.error)}/> : ''}
      <Grid container direction="column" justify="center" alignItems="center" style={{ marginTop: 20 }}>
        <Field
          name="profileImage"
          component={CustomImageInput}
          fileUpload={profileImage}
          title="Select a file"
          setFieldValue={setFieldValue}
          errorMessage={errors['profileImage'] ? i18n.t(errors['profileImage']) : undefined}
          touched={touched['profileImage']}
          style={{ display: 'flex' }}
          onBlur={handleBlur}
        />
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {i18n.t("save image")}
      </Button>
    </form>
  );
};

export default FormUpdateImgae;
