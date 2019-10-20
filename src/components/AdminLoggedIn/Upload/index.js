import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const useStyles = makeStyles((theme) =>
    createStyles({
        card: {
            height:"100%",
            minHeight:"250px"
        },
        cardHeader: {
            textAlign:"center",
            height:"20%"
        },
        cardContent: {
            height:"60%",
            textAlign:"center",
            verticalAlign:"middle"
        },
        cardActions: {
            height:"20%",
            justifyContent:"center"
        },
        icon: {
            fontSize: "120px"
        }
    })
);

const AdminLoggedInUploadComponent = () => {
    const classes = useStyles();
    return(
        <Card className={classes.card}>
            <CardHeader title="Upload DataSet" subheader="Run a new report" className={classes.cardHeader} />
            <CardContent className={classes.cardContent}>
                <Typography color="textSecondary" gutterBottom>
                    <PowerSettingsNewIcon color="secondary" className={classes.icon} />
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button color="primary" variant="outlined" onClick={() => {alert("HERE")}}>Reset & Upload new Dataset</Button>
            </CardActions>
        </Card>
    );
}

export default AdminLoggedInUploadComponent;