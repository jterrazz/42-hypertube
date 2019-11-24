import React, { Component } from 'react'
import axios from 'axios'
import { withAuthSync } from '../utils/auth';
import { withTranslation } from "react-i18next";
import { User } from "../src/components/templates/Users";
import ApiURL from "../utils/ApiURL";



axios.defaults.withCredentials = true;

class Users extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const response = await axios.get(ApiURL.users);

    const responseData = await response.data.users;

    this.setState({ users: responseData });
  }

  render () {
    return (
      <User
        users={this.state.users}
      />
    )
  }
}
export default (withAuthSync(withTranslation()(Users)));