import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from "@material-ui/core";
import { LinkTorrent } from "../atoms/LinkTorrent";
import Player from "../atoms/Player";
import {TypographyError} from "../atoms/TypographyError";
import {TypographyTitle} from "../atoms/TypographyTitle";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  }
}));

export const Torrent = (props) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <Container fixed>
        <Grid container spacing={4} justify="center" style={{ marginTop: 15 }}>
          <Grid item xs={9} md={9}>
            <LinkTorrent {...props}/>
            <TypographyError ErrorText={props.error}/>
          </Grid>
          <Grid item xs={2} md={1}>
            {props.edit ?
              <Fab
                color="secondary"
                aria-label="edit"
                onClick={props.onClickEdit}
              >
                <EditIcon />
              </Fab>
              :
              <Fab
                color="primary"
                aria-label="add"
                onClick={props.onClick}
              >
                <AddIcon />
              </Fab>
            }
          </Grid>
        </Grid>
        <Grid container spacing={4} justify="center" style={{ marginTop: 15 }}>
          {props.name ?
            <Grid item xs={10} md={10}>
              <TypographyTitle text={props.name}/>
            </Grid>
          : ''}
          <Grid item xs={10} md={10}>
            <Player url={props.urlMovieTorrent}/>
          </Grid>
        </Grid>
      </Container>

    </main>
  )
};
