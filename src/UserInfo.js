  
import React, { Component } from 'react';

class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      id: "",
      familyName: "",
      givenName: "",
      username: "",
      MyNewAttrributeKey: ""
    };
    this.props.keycloak.loadUserInfo().then(userInfo => {
        console.log(userInfo);
        this.setState({name: userInfo.name, email: userInfo.email, id: userInfo.sub, MyNewAttrributeKey: userInfo.MyNewAttrributeKey, username: userInfo.preferred_username, familyName: userInfo.family_name, givenName: userInfo.given_name})
    });
  }

  render() {
    return (
      <div className="UserInfo">
        <p>Username: {this.state.username}</p>
        <p>Name: {this.state.name}</p>
        <p>First: {this.state.givenName}</p>
        <p>Last: {this.state.familyName}</p>
        <p>Email: {this.state.email}</p>
        <p>ID: {this.state.id}</p>
        <p>MyNewAttrributeKey: {this.state.MyNewAttrributeKey}</p>
      </div>
    );
  }
}

export default UserInfo;