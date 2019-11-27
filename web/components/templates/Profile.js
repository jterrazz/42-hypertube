import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { TypographyTitle } from "../atoms/TypographyTitle";
import { CardProfile } from "../molecules/CardProfile";
import { BoxFormik } from "../molecules/Formik";
import FormInfos from "../organisms/FormProfileChangeInfos";
import FormPassword from "../organisms/FormProfileChangePassword";
import Copyright from "../atoms/Copyright";
import {makeStyles} from "@material-ui/core";
import dynamic from "next/dynamic";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  main_profile: {
    backgroundColor: "#F6F4FC",
  },
  paper_card: {
    padding: 10,
    background: "#F2F5F9"
  }
}));

export const Profile = (props, onChange) => {
  const FormUpdateImage = dynamic(() => import("../molecules/FormUpdateImageProfile"));
  const classes = useStyles();
  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar}/>

        <Container fixed>
          <TypographyTitle text="Dashboard"/>
          {props.me ?
            <CardProfile username={props.me.username}/> : ''}
          <TypographyTitle text="Settings Profile"/>
          <Grid container spacing={5} style={{marginTop: 10}}>
            <BoxFormik
              render={props => <FormUpdateImage error={props.Error} {...props} />}
              initialValues={props.valueImage}
              validationSchema={props.validationSchemaImage}
              onSubmit={props.SubmitImage}
            />
            {props.me ?
              <BoxFormik
                render={props => <FormInfos error={props.ErrorMail} onChange={props.onChange} {...props} />}
                initialValues={props.me}
                validationSchema={props.validationSchemaInfos}
                onSubmit={props.SubmitInfos}
              />
              : ''}
            <BoxFormik
              render={props => <FormPassword {...props} />}
              initialValues={props.value}
              validationSchema={props.validationSchemaPassword}
              onSubmit={props.SubmitPassword}
            />
          </Grid>

        </Container>
        <Copyright/>

      </main>
    </>
  )
};
