import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import {Field} from "formik";
import CustomImageInput from "./CustomImageInput";
import {useTranslation} from "react-i18next";
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



const FormUpdateImgae = (props, error) => {
  const {
    values: { profileImageUrl },
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = props;

  const classes = useStyles();

  const [t] = useTranslation();

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {props.error ? <BoxError text={props.error}/> : ''}
      <Grid container direction="column" justify="center" alignItems="center" style={{ marginTop: 20 }}>
        <Field
          name="profileImageUrl"
          component={CustomImageInput}
          fileUpload={profileImageUrl}
          title="Select a file"
          setFieldValue={setFieldValue}
          errorMessage={errors['profileImageUrl'] ? errors['profileImageUrl'] : undefined}
          touched={touched['profileImageUrl']}
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
        {t("save image")}
      </Button>
    </form>
  );
};

export default FormUpdateImgae;
