import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Secured from '../pages/Secured';
import User from '../pages/User';
import Admin from '../pages/Admin';
import Dispatch from './Dispatch';
import { useKeycloak } from '../components/PersistApp/lib';

import Bar from "../components/Bar";

function App() {
  const { keycloak } = useKeycloak();

  let user = {
    firstName: '',
    lastName: '',
    photoURL: '',
    username: ''
  };

  if(keycloak) {
    if(keycloak.idTokenParsed) {
      console.log(keycloak.idTokenParsed);
      user.firstName = keycloak.idTokenParsed.given_name;
      user.lastName = keycloak.idTokenParsed.family_name;
      user.username = keycloak.idTokenParsed.preferred_username;
      user.photoURL = "";
    }
  }

  function onSignOutClick() {
    keycloak.logout();
  }

  function onSignInClick() {
    keycloak.login();
  }

  function onSettingsClick() {
    keycloak.accountManagement();
  }

  function DisplayBar() {
    if(keycloak.authenticated) {
      return(<Bar signedIn title={"SOFA"} user={user.username} userData={user} onSettingsClick={onSettingsClick}  onSignOutClick={onSignOutClick}>TEST</Bar>);
    } else {
      return(<Bar title={"SOFA"} user="" userData={user} onSignInClick={onSignInClick}>TEST</Bar>);
    }
  }

  return (
    
    <div style={{width: "100%",height: "100vh"}}>
      <Router>
          {DisplayBar()}
          <Route exact path="/" component={Welcome} />
          <Route path="/dispatch" component={Dispatch} />
          <Route path="/user" component={User} />
          <Route path="/admin" component={Admin} />
          <Route path="/salesmotions" component={Secured} />
          <Route path="/statuses" component={Secured} />
          <Route path="/reports" component={Secured} />
          <Route path="/accounts" component={Secured} />
          <Route path="/specialists" component={Secured} />
          <Route path="/upload" component={Secured} />
      </Router>
    </div>
  );
}


export default App;