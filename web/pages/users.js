import React, { Component } from 'react'
import { UsersTemplate } from "../components/templates/Users";
import {authentified} from "../wrappers/auth";
import NavBar from "../components/organisms/NavBar";

class Users extends Component {
  state = {
    users: [],
    usersFiltered: [],
  };

  static async getInitialProps({ matchaClient }) {
    const users = await matchaClient.getUsers();

    return {
      users,
      namespacesRequired: ['common'],
    };
  }

  async componentDidMount() {
    this.setState({users: this.props.users, usersFiltered: this.props.users});
  }

  getUserName = (ev) => {
    const tmp = this.state.users.filter(x => x.username.includes(ev.target.value));
    this.setState({usersFiltered: tmp});
  };

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <NavBar />
        <UsersTemplate
          users={this.state.usersFiltered}
          onChange={this.getUserName}
        />
      </div>
    )
  }
}

export default authentified(true)(Users);
