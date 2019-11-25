import React, { Component } from 'react'
import { withAuthSync } from '../utils/auth';
import { withTranslation } from "react-i18next";
import { User } from "../components/templates/Users";

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

export default Users;
// export default (withAuthSync(withTranslation()(Users)));
