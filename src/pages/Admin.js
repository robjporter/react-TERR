import React from 'react';
import { Redirect } from "react-router-dom";

import AdminLoggedInComponent from "../components/AdminLoggedIn";
import { useKeycloak } from '../components/PersistApp/lib';

function Welcome() {
    const { keycloak } = useKeycloak();

    if(!keycloak.authenticated) {
        console.log("REDIRECTING TO HOME")
        return(<Redirect to="/" />);
    }
    return (
        <div width="100vw" height="100vh">
            {!!keycloak.authenticated && !!keycloak.idTokenParsed.Role.includes("Admin") && (
                <AdminLoggedInComponent />
            )}
        </div>
    );
}

export default Welcome;