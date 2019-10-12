import React from 'react';
import { useKeycloak } from '../components/PersistApp/lib';
import Button from "@material-ui/core/Button";
import ErrorButton from "../components/Buttons/ErrorButton";
import SuccessButton from "../components/Buttons/SuccessButton";

function Secured4() {
    const { keycloak, initialized } = useKeycloak();
    let Username = "";
    let Admin = "false";

    if(keycloak) {
        if(keycloak.idTokenParsed) {
            Username = keycloak.idTokenParsed.name;
            if(keycloak.idTokenParsed.Role.includes("Admin")) {
                Admin = "true";
            }
        }
    }

    return(
        <div>
            <div>{`User is ${!keycloak.authenticated ? 'NOT ' : ''}authenticated`}</div>
    
            {!!keycloak.authenticated && (
                <ErrorButton type="button" variant="contained" onClick={() => keycloak.logout()}>
                    Logout
                </ErrorButton>
            )}

            {!keycloak.authenticated && (
                <SuccessButton type="button" variant="contained" onClick={() => keycloak.login()}>
                    Login
                </SuccessButton>
            )}
            <br />
            <br />
            Username: {Username}
            <br />
            IsAdmin: {Admin}
        </div>
    );
}

export default Secured4;