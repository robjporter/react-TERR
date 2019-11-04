import React from 'react';

import { Redirect } from "react-router-dom";
import { useKeycloak } from '../components/PersistApp/lib';
import { store, view } from 'react-easy-state';
import RSMDashboard from '../components/RSMDashboard';
import RSMViewBy from '../components/RSMViewBy';


function RSM() {
    const { keycloak } = useKeycloak();

    if(!keycloak.authenticated || !keycloak.idTokenParsed.Role.includes("RSM")) {
        console.log("REDIRECTING TO HOME");
        return(<Redirect to="/" />);
    }
    return (
        <div width="100vw" height="100vh">
            {!!keycloak.authenticated && !!keycloak.idTokenParsed.Role.includes("RSM") && (
                <div>
                    <RSMDashboard accounts={2} accountManagers={2} totalUnqualified={2} regionScore={2} />
                    <RSMViewBy />
                </div>
            )}
        </div>
    );
}

export default view(RSM);