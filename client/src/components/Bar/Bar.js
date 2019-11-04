import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Redirect } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: {
        anchorEl: null
      }
    };
  }

  getNameInitials = () => {
    const { user, userData } = this.props;

    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const username = userData.username;
    const displayName = user.displayName;

    if (firstName && lastName) {
      return firstName.charAt(0) + lastName.charAt(0);
    } else if (firstName) {
      return firstName.charAt(0)
    } else if (lastName) {
      return lastName.charAt(0);
    } else if (username) {
      return username.charAt(0);
    } else if (displayName) {
      return displayName.charAt(0);
    } else {
      return 'NN';
    }
  };

  openMenu = (event) => {
    const anchorEl = event.currentTarget;

    this.setState({
      menu: {
        anchorEl
      }
    });
  };

  closeMenu = () => {
    this.setState({
      menu: {
        anchorEl: null
      }
    });
  };

  handleSettingsClick = () => {
    this.closeMenu();
    this.props.onSettingsClick();
  };

  handleSignOutClick = () => {
    this.closeMenu();
    this.props.onSignOutClick();
    return(<Redirect to="/" />);
  };

  handleSignInClick = () => {
    this.props.onSignInClick();
  };

  handleSignUpClick = () => {
    this.props.onSignUpClick();
  };

  render() {
    // Properties
    const { performingAction, signedIn, user, userData } = this.props;

    const { menu } = this.state;

    return (
      <AppBar color="primary" position="static">
        <Toolbar variant="regular">
          <Box flexGrow={1}>
            <Typography color="inherit" variant="h6"><a href="/" style={{textDecoration:"none",color:"white"}}>{this.props.title}</a></Typography>
          </Box>

          {signedIn &&
            <>
              <IconButton color="inherit" disabled={performingAction} onClick={this.openMenu}>
                {user.photoURL &&
                  <Avatar alt="Avatar" src={user.photoURL} />
                }

                {!user.photoURL &&
                  <Avatar alt="Avatar">
                    {this.getNameInitials()}
                  </Avatar>
                }
              </IconButton>

              <StyledMenu anchorEl={menu.anchorEl}  open={Boolean(menu.anchorEl)} onClose={this.closeMenu}>
                <MenuItem disabled={performingAction} style={{color:"gray"}}>{userData.firstName}{" "}{userData.lastName}</MenuItem>
                <MenuItem disabled={performingAction} onClick={this.handleSettingsClick}>Settings</MenuItem>
                <MenuItem disabled={performingAction} onClick={this.handleSignOutClick}>Sign out</MenuItem>
              </StyledMenu>
            </>
          }

          {!signedIn &&
            <>
              <Box mr={1}>
                <Button color="secondary" disabled={performingAction} variant="contained" onClick={this.handleSignUpClick}>Sign Up</Button>
              </Box>

              <Button color="secondary" disabled={performingAction} variant="contained" onClick={this.handleSignInClick}>Sign In</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

Bar.defaultProps = {
  performingAction: false,
  signedIn: false
};

Bar.propTypes = {
  // Properties
  performingAction: PropTypes.bool.isRequired,
  signedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object,

  // Events
  onSettingsClick: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired
};

export default Bar;