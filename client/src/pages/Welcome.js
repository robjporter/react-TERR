import React from 'react';

import { Redirect } from "react-router-dom";
import { useKeycloak } from '../components/PersistApp/lib';
import BackgroundComponent from "../components/Background";

function Welcome() {
    const { keycloak } = useKeycloak();

    if(keycloak.idToken) {
      if(keycloak.idTokenParsed) {
        console.log("IDTOKENPARSED");
      } else {
        keycloak.loadUserProfile(function() {
          console.log("LOADUSERPROFILE");
        },function() {
          console.log("ERROR, NO PROFILE LOADED.");
        });
      }
    }

    if(keycloak.authenticated) {
      if(keycloak.idTokenParsed.Role.includes("Admin")) {
        console.log("REDIRECTING TO ADMIM");
        return(<Redirect to="/admin" />);
      } else if(keycloak.idTokenParsed.Role.includes("RSM")) {
        console.log("REDIRECTING TO RSM");
        return(<Redirect to="/rsm" />);
      } else {
        console.log("REDIRECTING TO USER");
        return(<Redirect to="/user" />);
      }
    }
    return (
      <div width="100vw" height="100vh">
        {!keycloak.authenticated && (
          <BackgroundComponent background="https://images.unsplash.com/photo-1555041469-a586c61ea9bc" title="SOFA" subTitle="Salesforce Opportunity Filtering & Analytics" />
        )}
      </div>
    );
}

export default Welcome;