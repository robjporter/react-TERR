import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Logout extends Component {

  logout() {
    this.props.history.push('/')
    this.props.keycloak.logout();
  }

  render() {
    return (
      <Button variant="outlined" color="primary" onClick={ () => this.logout() }>
        Logout
      </Button>
    );
  }
}

export default withRouter(Logout);