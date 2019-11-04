import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import { store, view } from 'react-easy-state';

import { isEmpty, makeid } from "../../app/Functions";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    level0: {
        backgroundColor: 'green !important'
    },
    level1: {
        backgroundColor: 'blue !important'
    },
    level2: {
        backgroundColor: 'orange !important'
    },
    level3: {
        backgroundColor: 'red !important'
    },
    select: {
    }
}));

const AccountMotionStore = store({
    AccountMotionData: [],
    AddData(smname,sname) {
        AccountMotionStore.AccountMotionData.push({sm: smname,s: sname});
    },
    UpdateData(item,status) {
        let pos = AccountMotionStore.AccountMotionData.findIndex(i => i.sm === item);
        AccountMotionStore.AccountMotionData[pos] = {sm: AccountMotionStore.AccountMotionData[pos].sm,s: status};
    }
});

function getCategoryMenuItems(categories, letter, name) {
    let status = [];

    let style = {backgroundColor: "red !important"};

    if(categories) {
        status.push();
        for( let i = 0; i < categories.length; i++) {
            status.push(<MenuItem key={letter+i} data-value={name+"|"+categories[i].id+"|"+categories[i].status_score} value={categories[i].status_name} style={style}>{categories[i].status_name}</MenuItem>);
        }
    }
    return status;
}

const AccountMotions = (props) => {
    const { onStateChange } = props;
    const { AddData, AccountMotionData, UpdateData } = AccountMotionStore;
    let item = "";

    if(props.data.data) {
        if( AccountMotionData.length != props.data.data.length) {
            for(let i = 0; i < props.data.data.length; i++) {
                AddData(props.data.data[i].salesmotion_name,props.data.data[i].status_name);
            }
        }
        item = getCategoryMenuItems(props.data.categories, makeid(5), props.data.data[0].salesmotion_name);
    }

    const handleChange = event => {
        UpdateData(event.target.name, event.target.value);
        onStateChange(AccountMotionData);
    }

    const classes = useStyles();
    return(
        <div>
            {props.data.data && AccountMotionStore.AccountMotionData.map(contact => (
                <FormControl variant="filled" className={classes.formControl} key={"formControl_"+makeid(5)}>
                    <InputLabel htmlFor={contact.sm}>{unescape(contact.sm)}</InputLabel>
                    <Select
                    key={"select_"+makeid(5)}
                    value={contact.s}
                    onChange={handleChange}
                    className={classes.select}
                    name={contact.sm}
                    >
                        {item}
                    </Select>
                </FormControl>
            ))}
        </div>
    );
}

export default view(AccountMotions);