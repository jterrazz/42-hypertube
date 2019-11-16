import React, { Component } from 'react'
import axios from 'axios'
import ApiURL from '../utils/ApiURL';
import { withAuthSync } from '../utils/auth';
import { withTranslation } from "react-i18next";
import { Home } from "../src/components/templates/Home";

axios.defaults.withCredentials = true;

class Index extends Component {
  state = {
    movie: []
  };

  async componentDidMount() {
    const response = await axios.get(ApiURL.movie_hot);

    const responseData = response.data.rankedMovies;

    this.setState({ movie: responseData })
  }

  render () {
    return (
      <Home movie={this.state.movie}/>
    )
  }
}
export default (withAuthSync(withTranslation()(Index)));
