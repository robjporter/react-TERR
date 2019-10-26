import React, { forwardRef, useState } from 'react';
import { Redirect } from "react-router-dom";

import LoggedInComponent from "../components/LoggedIn";
import { useKeycloak } from '../components/PersistApp/lib';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import axios from "axios";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

let COLUMNS = [
    { title: "Account ID", field: "id", hidden: true},
    { title: "Account Name", field: "account_name"},
    { title: "Account Manager", field: "am_name"},
]

function getData(surname, firstname) {
    return axios.get("/pss/"+surname+"/"+firstname)
        .then(response =>  {
            if(response.data.length > 0) {
                return(response.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

const User = () => {
    const { keycloak } = useKeycloak();
    const [AccountData, setAccountData] = useState([{}]);
    
    if(!keycloak.authenticated) {
        return(<Redirect to="/" />);
    }

    if(Object.keys(AccountData[0]).length === 0) {
        getData(keycloak.idTokenParsed.family_name,keycloak.idTokenParsed.given_name).then(function(results) {
            let data = [];
            for(let i = 0; i < results.length; i++) {
                let record = {
                    account_name: unescape(results[i].account_name),
                    am_name: unescape(results[i].am_name),
                    id: results[i].id,
                    region_name: results[i].region_name,
                    sector_name: results[i].sector_name
                }
                data.push(record);
            }
            setAccountData(data);
        });
    }

    console.log("ACCOUNTDATA: ",AccountData);

    return (
        <div width="100vw" height="100vh">
            {!!keycloak.authenticated && !keycloak.idTokenParsed.Role.includes("Admin") && (
                <div>
                    <LoggedInComponent UserID={keycloak.idTokenParsed.USERID}/>

                    <MaterialTable
                        icons={tableIcons}
                        title="Managed Account List"
                        columns={COLUMNS}
                        data={AccountData}
                        actions={[
                            {
                                icon: Edit,
                                tooltip: 'Edit Account',
                                onClick: (event,rowData) => {
                                    alert(rowData.id)
                                }
                            }
                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default User;
