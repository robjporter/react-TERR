import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './app/serviceWorker';

import PersistApp from "./components/PersistApp";

//ReactDOM.render(<KeycloakProvider keycloak={keycloak}><ThemeProvider theme={theme}><CssBaseline /><App /></ThemeProvider></KeycloakProvider>, document.getElementById('root'));

//ReactDOM.render(<ThemeProvider theme={theme}><CssBaseline /><App /></ThemeProvider>, document.getElementById('root'));

ReactDOM.render(<PersistApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();