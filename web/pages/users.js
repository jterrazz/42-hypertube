import React, { Component } from 'react'
import { User } from "../components/templates/Users";
import {authentified} from "../wrappers/auth";

class Users extends Component {

  static async getInitialProps({ matchaClient }) {
    const users = await matchaClient.getUsers()

    return {
      users
    };
  }

  render() {
    return (
      <User
        users={this.props.users}
      />
    )
  }
}

export default authentified(true)(Users);
