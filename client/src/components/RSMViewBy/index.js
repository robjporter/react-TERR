import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: `0px`,
        marginBottom: `10px`,
        height: '400px'
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "calc(100vh / 2)"
    }
}));

const RSMDashboard = (props) => {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Button variant="contained" color="primary" fullWidth={true}>View</Button>
                        <Typography variant="h4">Account Manager</Typography>
                        Account Manager
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Button variant="contained" color="primary" fullWidth={true}>View</Button>
                        <Typography variant="h4">Account</Typography>
                        Account
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Button variant="contained" color="primary" fullWidth={true}>View</Button>
                        <Typography variant="h4">PSS</Typography>
                        Product Sales Specialist
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Button variant="contained" color="primary" fullWidth={true}>View</Button>
                        <Typography variant="h4">Technology</Typography>
                        Strategic Technology
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default RSMDashboard;