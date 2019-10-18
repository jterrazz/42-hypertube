import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CustomSearchInput from "../src/CustomSearchInput";
import axios from "axios";
import NavBar from "../src/NavBar";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  }
}));

const SearchHome = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content} >
        <div className={classes.toolbar} />
        <Container fixed>
          <CustomSearchInput />
        </Container>
      </main>
    </div>
  )
};

axios.defaults.withCredentials= true;

class Search extends Component {
  state = {
    movie: []
  };

  render () {
    return (
      <SearchHome />
    )
  }
}
export default Search