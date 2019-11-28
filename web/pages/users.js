import React, { Component } from 'react'
import UsersTemplate from "../components/templates/Users";
import {authentified} from "../wrappers/auth";

class Users extends Component {
  state = {
    users: [],
  };

  static async getInitialProps({ matchaClient }) {
    const users = await matchaClient.getUsers();

    return {
      users,
    };
  }

  async componentDidMount() {
    this.setState({users: this.props.users});
  }

  onChange = (ev) => {
    console.log(ev.target.value);
  };

  render() {
    return (
      <UsersTemplate
        users={this.state.users}
        onchange={this.onChange}
      />
    )
  }
}

export default authentified(true)(Users);
