import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: `10px`,
        marginBottom: `10px`
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paperCiscoBlue: {
        padding: theme.spacing(1),
        textAlign: 'center',
        backgroundColor: '#005073',
        color: '#ffffff',
    },
    paperGreen: {
        padding: theme.spacing(1),
        textAlign: 'center',
        backgroundColor: '#74bf4b',
        color: '#ffffff',
    },
    paperAmber: {
        padding: theme.spacing(1),
        textAlign: 'center',
        backgroundColor: '#ffab2c',
        color: '#ffffff',
    },
    paperRed: {
        padding: theme.spacing(1),
        textAlign: 'center',
        backgroundColor: '#e3241b',
        color: '#ffffff',
    }
}));

const UserDashboard = (props) => {
    const classes = useStyles();
    const {accounts, average, categoryCount, ams, pss} = props;
    let average2 = Math.ceil(average);

    let colorBox = classes.paper;
    if(average2 <= 25) {
        colorBox = classes.paperGreen;
    } else if(average2 > 25 && average <= 75) {
        colorBox = classes.paperAmber;
    } else {
        colorBox = classes.paperRed;
    }

    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paperCiscoBlue}>
                        <Typography variant="h3">{accounts}</Typography>
                        Accounts
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paperCiscoBlue}>
                        <Typography variant="h3">{ams.length}</Typography>
                        Account Managers
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paperCiscoBlue}>
                        <Typography variant="h3">{pss}</Typography>
                        Total Score
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={colorBox}>
                        <Typography variant="h3">{average2} / {categoryCount}</Typography>
                        Average Score
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default UserDashboard;