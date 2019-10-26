import React from 'react';
import { useKeycloak } from './lib';

class KeyCloakInfo extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            keycloak: null
        };
        console.log("constructor");
        this.setupKeycloak = this.setupKeycloak.bind(this);
        this.GetUsername = this.GetUsername.bind(this);
    }  
    componentWillUnmount() {
        console.log("componentWillUnmount");
        this._isMounted = false;
    }
    componentDidMount() {
        console.log("componentDidMount");
        this._isMounted = true;
        console.log("DIDMOUNT");
        this.setupKeycloak();
    }
    setupKeycloak() {
        console.log("ISMOUNTED: setupKeycloak: ",this._isMounted);
        if(this._isMounted) {
            const { keycloak } = useKeycloak();
            this.setState({keycloak: keycloak});
        }
    }
    GetUsername() {
        console.log("GetUsername: GetUsername");
        console.log("GetUsername: ISMOUNTED: ",this._isMounted);
        console.log("GetUsername: state: ",this.state);
        if(this._isMounted === true) {
            console.log("GetUsername: _isMounted");
            if(this.state.keycloak.idTokenParsed) {
                return this.state.keycloak.idTokenParsed.name;
            }
        }
        return "";
    }
    render() {
        return null;
    }
}

export default KeyCloakInfo;