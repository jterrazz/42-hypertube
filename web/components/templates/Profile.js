import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { TypographyTitle } from "../atoms/TypographyTitle";
import { CardProfile } from "../molecules/CardProfile";
import { BoxFormik } from "../molecules/Formik";
import FormInfos from "../organisms/FormProfileChangeInfos";
import FormPassword from "../organisms/FormProfileChangePassword";
import { withStyles } from "@material-ui/core";
import dynamic from "next/dynamic";

const styles = theme => ({
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
});

class Profile extends Component {

  render () {

    const {
      classes,
      onChange,
      onChangeImage,
      onChangePassword,
      ErrorInfo,
      ErrorImage,
      ErrorPassword,
      infoPassword,
      me
    } = this.props;

    const FormUpdateImage = dynamic(() => import("../molecules/FormUpdateImageProfile"));
    return (
      <main className={classes.content}>
        <div className={classes.toolbar}/>

        <Container fixed>
          <TypographyTitle text="Dashboard"/>
          {this.props.me ?
            <CardProfile me={me} username={this.props.me.username}/> : ''}
          <TypographyTitle text="Settings Profile"/>
          <Grid container spacing={5} style={{marginTop: 10}}>
            <BoxFormik
              render={(props) => <FormUpdateImage error={ErrorImage} onChange={onChangeImage} {...props} />}
              initialValues={this.props.valueImage}
              validationSchema={this.props.validationSchemaImage}
              onSubmit={this.props.SubmitImage}
            />
            {this.props.me ?
              <BoxFormik
                render={props => <FormInfos error={ErrorInfo} onChange={onChange} me={me} {...props} />}
                initialValues={this.props.me}
                validationSchema={this.props.validationSchemaInfos}
                onSubmit={this.props.SubmitInfos}
              />
              : ''}
            <BoxFormik
              render={props => <FormPassword error={ErrorPassword} info={infoPassword} onChange={onChangePassword} {...props} />}
              initialValues={this.props.value}
              validationSchema={this.props.validationSchemaPassword}
              onSubmit={this.props.SubmitPassword}
            />
          </Grid>

        </Container>

      </main>
    )
  }
}

export default withStyles(styles)(Profile);
