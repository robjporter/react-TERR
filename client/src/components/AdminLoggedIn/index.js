import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';
import Games from '@material-ui/icons/Games';
import Equalizer from '@material-ui/icons/Equalizer';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';

import AdminLoggedInUploadComponent from "./Upload";

const useStyles = makeStyles((theme) =>
    createStyles({
        grid: {
            width:"100%",
            marginTop:"5px",
            marginBottom:"5px",
            marginLeft:"5px",
            paddingRight:"10px"
        },
        gridItem: {
            height:"calc((100vh / 2) - 35px)"
        },
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

const AdminLoggedInComponent = () => {
    const classes = useStyles();
    return(
        <Grid container spacing={3} height="100vh" className={classes.grid}>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} className={classes.gridItem}>
                <Card className={classes.card}>
                    <CardHeader title="Sales Motions" subheader="Add / Edit / Delete Sales Motions" className={classes.cardHeader} />
                    <CardContent className={classes.cardContent}>
                        <Typography color="textSecondary" gutterBottom>
                            <SlowMotionVideoIcon color="secondary" className={classes.icon} />
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button color="primary" variant="outlined">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} className={classes.gridItem}>
                <Card className={classes.card}>
                    <CardHeader title="Statuses" subheader="Add / Edit / Delete Status Options" className={classes.cardHeader} />
                    <CardContent className={classes.cardContent}>
                        <Typography color="textSecondary" gutterBottom>
                            <Games color="secondary" className={classes.icon} />
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button color="primary" variant="outlined">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} className={classes.gridItem}>
                <Card className={classes.card}>
                    <CardHeader title="Reports" subheader="Run a new report" className={classes.cardHeader} />
                    <CardContent className={classes.cardContent}>
                        <Typography color="textSecondary" gutterBottom>
                            <Equalizer color="secondary" className={classes.icon} />
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button color="primary" variant="outlined">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} className={classes.gridItem}>
                <Card className={classes.card}>
                    <CardHeader title="Realign Account" subheader="Add / Edit / Delete Sales Motions" className={classes.cardHeader} />
                    <CardContent className={classes.cardContent}>
                        <Typography color="textSecondary" gutterBottom>
                            <AccountBalanceIcon color="secondary" className={classes.icon} />
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button color="primary" variant="outlined">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} className={classes.gridItem}>
                <Card className={classes.card}>
                    <CardHeader title="Realign PSS" subheader="Add / Edit / Delete Status Options" className={classes.cardHeader} />
                    <CardContent className={classes.cardContent}>
                        <Typography color="textSecondary" gutterBottom>
                            <TransferWithinAStationIcon color="secondary" className={classes.icon} />
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button color="primary" variant="outlined">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} className={classes.gridItem}>
                <AdminLoggedInUploadComponent />
            </Grid>
        </Grid>
    );
}

export default AdminLoggedInComponent;