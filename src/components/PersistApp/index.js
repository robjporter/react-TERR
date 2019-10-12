import Keycloak from 'keycloak-js';
import React from 'react';

import { KeycloakProvider } from './lib';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from "../../theme/theme";

import App from '../../app/App';

const keycloak = new Keycloak("./keycloak.json");

const keycloakProviderInitConfig = {
    onLoad: 'check-sso',
};

class PersistedApp extends React.PureComponent {
  onKeycloakEvent = (event, error) => {
    console.log('onKeycloakEvent', event, error);
  };

  onKeycloakTokens = tokens => {
    console.log('onKeycloakTokens', tokens);
  };

  render() {
    return (
        <KeycloakProvider
            keycloak={keycloak}
            initConfig={keycloakProviderInitConfig}
            onEvent={this.onKeycloakEvent}
            onTokens={this.onKeycloakTokens}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </KeycloakProvider>
    );
  }
}

export default PersistedApp;