import React from 'react';
import { Redirect } from "react-router-dom";

import LoggedInComponent from "../components/LoggedIn";
import { useKeycloak } from '../components/PersistApp/lib';

function User() {
    const { keycloak } = useKeycloak();
    if(!keycloak.authenticated) {
        return(<Redirect to="/" />);
    }
    return (
        <div width="100vw" height="100vh">
            {!!keycloak.authenticated && !keycloak.idTokenParsed.Role.includes("Admin") && (
                <LoggedInComponent />
            )}
        </div>
    );
}

export default User;