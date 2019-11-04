import React, { forwardRef, useState } from 'react';
import { Redirect } from "react-router-dom";

import { useKeycloak } from '../components/PersistApp/lib';

import MaterialTable from 'material-table';

import UserDashboard from "../components/UserDashboard";

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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import AccountMotions from "../components/ActionMotions";
import { getData, getMotionData, getAccountData, getCategoriesData, setSalesMotionInfo } from "../app/APICalls";
import { store, view } from 'react-easy-state';

const UserMotionStore = store({
    accountCount: 0,
    accountManagersCount: 0,
    averagePSSScore: 0,
    totalCategoryCount: 0,
    totalPSSScore: 0,
    accountData: [],
    accountIDS: [],
    accountAMS: [],
    AddAccountData(data) {
        UserMotionStore.accountData = data;
    },
    AddAccount(data) {
        UserMotionStore.accountData.push(data);
    },
    AddAccountIDS(id) {
        UserMotionStore.accountIDS.push(id);
    },
    AddAccountAMS(id) {
        UserMotionStore.accountAMS.push(id);
    },
    GetAccountIDS() {
        return UserMotionStore.accountIDS;
    },
    GetAccountIDSLength() {
        return UserMotionStore.accountIDS.length;
    },
    UpdateAccountCount(count) {
        UserMotionStore.accountCount = count;
    },
    UpdateAccountManagersCount(count) {
        UserMotionStore.accountManagersCount = count;
    },
    UpdateAveragePSSCount(count) {
        UserMotionStore.averagePSSScore = count;
    },
    UpdateTotalPSSCount(count) {
        UserMotionStore.totalPSSScore = count;
    },
    UpdateAccountScore(accID, score) {
        let pos = UserMotionStore.accountData.findIndex(x => x.id === accID);
        let record = UserMotionStore.accountData[pos];
        record.score = score;
        UserMotionStore.accountData[pos] = record;
    },
    GetAccountScore(accID) {
        let pos = UserMotionStore.accountData.findIndex(x => x.id === accID);
        return UserMotionStore.accountData[pos];
    },
    UpdateTotalCategoryCount(count) {
        UserMotionStore.totalCategoryCount = count;
    }
});

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
    { title: "Account Score", field: "score"},
]

async function getAD(id) {
    return await getAccountData(id);
}

async function getCategories() {
    return await getCategoriesData();
}

async function setSalesMotion(info) {
    return await setSalesMotionInfo(info);
}

const User = () => {
    const { keycloak } = useKeycloak();
    const [ActiveID, setActiveID] = useState(-1);
    const [Open, setOpen] = useState(false);
    const [AccountName, setAccountName] = useState(-1);
    const [accountMotionValues, setaccountMotionValues] = useState({});
    const { accountAMS, accountCount, accountData, accountIDS, AddAccount, AddAccountData, AddAccountAMS, AddAccountIDS, averagePSSScore, GetAccountIDS, GetAccountIDSLength, totalCategoryCount, totalPSSScore, UpdateAccountCount, UpdateAccountManagersCount, UpdateAccountData, UpdateAccountScore, UpdateTotalCategoryCount, UpdateAveragePSSCount, UpdateTotalPSSCount } = UserMotionStore;
    
    const handleStateChange = updatedState => {
        setaccountMotionValues(updatedState);
    }
    
    if(!keycloak.authenticated) {
        return(<Redirect to="/" />);
    }

    if(accountData.length === 0) {
        getData(keycloak.idTokenParsed.family_name,keycloak.idTokenParsed.given_name).then(function(results) {
            if(results) {
                for(let i = 0; i < results.length; i++) {
                    let position = accountAMS.indexOf(unescape(results[i].am_name));
                    if (!~position) {
                        AddAccountAMS(unescape(results[i].am_name));
                    }

                    let record = {
                        account_name: unescape(results[i].account_name),
                        am_name: unescape(results[i].am_name),
                        id: results[i].id,
                        salesmotion_id: results[i].salesmotion_id,
                        region_name: results[i].region_name,
                        sector_name: results[i].sector_name,
                        score: 0
                    }
                    AddAccountIDS(results[i].id)
                    AddAccount(record);
                }
            }
            // GET ACCOUNT MOTIONS
            if(accountIDS.length > 0 && totalPSSScore === 0) {
                getMotionData(accountIDS).then(function(results) {
                    var scores = [];

                    if(results) {
                        for(let i = 0; i < accountIDS.length; i++) {
                            var count = 0;
                            var newArray = results.filter(function (el) {
                                return el.ac_id === accountIDS[i];
                            });
                            for(let j = 0;j < newArray.length; j++) {
                                count += newArray[j].status_score;
                            }
                            scores.push({id:accountIDS[i],score:count});
                        }
                    }

                    let total = 0;
                    for(let i = 0; i < accountData.length; i++) {
                        let id = accountData[i].id;
                
                        let newArray = scores.filter(function (el) {
                            return el.id === id;
                        });
                
                        total += newArray[0].score;

                        UpdateAccountScore(id, newArray[0].score);
                    }

                    getCategoryCount().then(function(results){UpdateTotalCategoryCount(results.length * 10);});
                    UpdateTotalPSSCount(total);
                    UpdateAveragePSSCount(total / accountData.length);
                    UpdateAccountCount(accountData.length);
                    
                });
            }
        });
    }

    async function getCategoryCount() {
        return await getAD(accountIDS[0]);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    async function loadData(id) { 
        let data = {
            id: id,
            data: null,
            categories: null,
        };
        let tmp = await getAD(id);
        let tmp2 = await getCategories();

        data.data = tmp;
        data.categories = tmp2;

        setActiveID(data);
    }
    
    const handleClose = () => {
        setOpen(false);
        setActiveID(-1);
    };

    const updateSalesMotionData = (Update) => {
        for(let i = 0; i < Update.length; i++) {
            setSalesMotion(Update[i]);
        }
    }

    const saveData = () => {
        let accountID = ActiveID.id;
        let toUpdate = [];
        let newTotalScore = totalPSSScore;
        let accountScore = 0;

        console.log("ActiveID: ", ActiveID);

        if(ActiveID.data) {
            if(ActiveID.data.length > 0) {
                for(let i = 0; i < ActiveID.data.length; i++) {
                    // OLD
                    let pos = ActiveID.categories.findIndex(x => x.status_name === ActiveID.data[i].status_name);
                    let oldScore = ActiveID.categories[pos].status_score;

                    // NEW
                    let newScore = -1;

                    if(ActiveID.data[i].status_name !== accountMotionValues[i].s) {
                        let statID = -1;
                        for(let j = 0; j < ActiveID.categories.length; j++) {
                            if(ActiveID.categories[j].status_name === accountMotionValues[i].s) {
                                statID = j;
                            }
                        }
                        let info = {
                            account_id: accountID,
                            salesmotion_id: i + 1,
                            status_id: statID + 1
                        }
                        // NEW
                        newScore = ActiveID.categories[statID].status_score;

                        newTotalScore -= oldScore; 
                        newTotalScore += newScore;

                        toUpdate.push(info)
                    }

                    if(newScore > -1) {
                        accountScore += newScore;
                    } else {
                        accountScore += oldScore;
                    }
                }
            }
            UpdateAccountScore(ActiveID.id, accountScore);
            updateSalesMotionData(toUpdate);
            UpdateTotalPSSCount(newTotalScore);
            UpdateAveragePSSCount(newTotalScore / accountCount);
        }

        handleClose();
        //window.location.reload();
    }

    return (
        <div width="100vw" height="100vh">
            {!!keycloak.authenticated && !keycloak.idTokenParsed.Role.includes("Admin") && (
                <div>
                    <UserDashboard accounts={accountCount} average={averagePSSScore} categoryCount={totalCategoryCount} ams={accountAMS} pss={totalPSSScore} />

                    <MaterialTable
                        icons={tableIcons}
                        title="Managed Account List"
                        columns={COLUMNS}
                        data={accountData}
                        actions={[
                            {
                                icon: Edit,
                                tooltip: 'Edit Account',
                                onClick: (event,rowData) => {
                                    loadData(rowData.id);
                                    setAccountName(rowData.account_name);
                                    handleClickOpen();
                                }
                            }
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            exportButton: true,
                            grouping: true
                        }}
                    />
                    <Dialog open={Open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">{AccountName}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                The current sales motion settings are below. Please update and click save.
                            </DialogContentText>
                            <AccountMotions data={ActiveID} onStateChange={handleStateChange} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} variant="outlined" color="primary">
                                Cancel
                            </Button>
                            <Button onClick={saveData} variant="contained" color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}
        </div>
    );
}

export default view(User);