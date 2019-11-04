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

const RSMDashboard = (props) => {
    const classes = useStyles();
    const { accounts, accountManagers, totalUnqualified, regionScore } = props;

    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paperCiscoBlue}>
                        <Typography variant="h3">{accountManagers}</Typography>
                        Account Managers
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paperCiscoBlue}>
                        <Typography variant="h3">{accounts}</Typography>
                        Accounts
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paperCiscoBlue}>
                        <Typography variant="h3">{totalUnqualified}</Typography>
                        Total Unqualified
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paperCiscoBlue}>
                        <Typography variant="h3">{regionScore}</Typography>
                        Region Score
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default RSMDashboard;