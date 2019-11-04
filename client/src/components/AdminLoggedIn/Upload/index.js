import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { DropzoneDialog } from 'material-ui-dropzone';
import Papa from "papaparse";
import axios from "axios";

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { CSV_DATACOLUMN_COUNT, CONST_DATASET_COL_SALES_L4, CONST_DATASET_COL_ACCOUNT, CONST_DATASET_COL_AM, CONST_DATASET_COL_RSM, CONST_DATASET_COL_PSS } from "../../../constants";

let globalQueries = [];
let displayButton = false;

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

// DropZone
class DropzoneDialogExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
            buttonText: "Upload DataSet",
            buttonDisabled: "",
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files, 
            open: false
        });
        this.setState({buttonText: "Processing Data"});

        Papa.parse(files[0], {
            header: true,
            camelCase: function(str) { 
                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
            },
            processName: function(name) {
                let splits = name.split(",");
                let sName = "";
                let fName = "";

                if(name.indexOf(",") === -1) {
                    return this.camelCase("unknown");
                }

                if(splits.length === 1) {
                    return this.camelCase(splits[0].trimStart().trimEnd());
                }

                if(splits.length === 2) {
                    sName = this.camelCase(splits[0].trimStart().trimEnd());
                    fName = this.camelCase(splits[1].trimStart().trimEnd());
                    return sName + ", " + fName;
                }
            },
            processSalesL4: function(data, pos) {
                let splits = data.split("-");

                // Corner case where data is empty
                if(data === "") { data = "Unknown"; }

                if(data.indexOf("-") === -1) {
                    // Only return if pos is = to 0
                    if(pos === 0) {
                        return data;
                    }
                    return;
                }

                if(splits.length === 2) {
                    if(pos === 0) {
                        if(splits[0] === "Pub") {
                            return "PubSec";
                        }
                        if(splits[0] === "Comm") {
                            return "Commercial";
                        }
                        return splits[0];
                    } else {
                        return splits[1];
                    }
                }
            },
            getCategoryNames: function(results) {
                let categories = [];
                // GET All Category names
                for(let i = CSV_DATACOLUMN_COUNT; i < results.length-1; i++) {
                    if(results[i] !== "undefined") {
                        categories.push(escape(results[i]));
                    }
                }
                return categories;
            },
            getAMRSMPSSActions: function(results, categories) {
                var tam = [];
                var trsm = [];
                var tpss = [];
                var tactions = [];

                // ADD PLACEHOLDER TO START OF ARRAY
                trsm.push("PlaceHolder");
                tpss.push("PlaceHolder");

                // GET AM, RSM, PSS and all STATUS/ACTION info
                for (let i = 0; i < results.data.length; i++) {
                    tam.push(escape(this.processName(results.data[i]["AM"])));
                    trsm.push(escape(this.processName(results.data[i]["RSM"])));
                    tpss.push(escape(this.processName(results.data[i]["PSS"])));
                    for(let j = 0; j < categories.length; j++) {
                        if(results.data[i][categories[j]] !== "") {
                            tactions.push(escape(results.data[i][categories[j]]).toLowerCase());
                        }
                    }
                }
                return [
                    tam,
                    trsm,
                    tpss,
                    tactions
                ];
            },
            getAccountMotion: function(results, categories, am, actions) {
                var accounts = [];
                var accountMotion = [];

                // Create entries for SQL statements
                for (let i = 0; i < results.data.length; i++) {
                    // Account info
                    var data = {
                        region: escape(this.processSalesL4(results.data[i]["Sales L4"],0)),
                        sector: escape(this.processSalesL4(results.data[i]["Sales L4"],1)),
                        name: escape(results.data[i]["Account"]),
                        amid: am.indexOf(escape(this.processName(results.data[i]["AM"])))+1
                    };
                    accounts.push(data);

                    if(i === 0 || i === 1 || i === 2 || i === 16) {
                        console.log(results.data[i]);
                    }

                    // Account Motions
                    for(let j = 0; j < categories.length; j++) {
                        var field = results.data[i][unescape(categories[j])];
                        if(field === "") {
                            field = "u";
                        } else if(field === "undefined") {
                            field = "u";
                        } else if(field === undefined) {
                            field = "u";
                        }

                        console.log("FIELD: ",field);

                        let data = {
                            accountid: accounts.length,
                            salesmotionid: j+1,
                            statusid: actions.indexOf(escape(field.toLowerCase()).toLowerCase())+1
                        };
                        accountMotion.push(data);
                    }
                }

                return [
                    accounts,
                    accountMotion
                ];
            },
            processData: function(results) {
                var categories = this.getCategoryNames(results.meta.fields);
                var tamrsmpssactions = this.getAMRSMPSSActions(results, categories);

                // GET Unique entries for AM, PSS, RSM and Actions/Status
                var am = Array.from(new Set(tamrsmpssactions[0]));
                var rsm = Array.from(new Set(tamrsmpssactions[1]));
                var pss = Array.from(new Set(tamrsmpssactions[2]));
                var actions = Array.from(new Set(tamrsmpssactions[3]));

                // Remove Undefined
                var index = actions.indexOf("undefined");
                if (index > -1) {
                    actions.splice(index, 1);
                }

                // GET all Accounts and their associated Actions/Status
                var accountmotion = this.getAccountMotion(results, categories, am, actions);
                var accounts = accountmotion[0];
                var accountMotion = accountmotion[1];

                // BUILD QUERIES
                // STATUS -> CATEGORIES -> RSM -> PSS -> AM -> ACCOUNT -> ACCOUNTMOTIONS 
                var queries = [];
                for(let i = 0; i < actions.length; i++) {
                    queries.push("INSERT INTO `sofa`.`status` (`status_name`) VALUES ('" + actions[i] + "');");
                }
                for(let i = 0; i < categories.length; i++) {
                    queries.push("INSERT INTO `sofa`.`salesmotion` (`salesmotion_name`) VALUES ('" + categories[i] + "');");
                }
                for(let i = 0; i < rsm.length; i++) {
                    queries.push("INSERT INTO `sofa`.`rsm` (`rsm_name`) VALUES ('" + rsm[i] + "');");
                }
                for(let i = 0; i < pss.length; i++) {
                    queries.push("INSERT INTO `sofa`.`pss` (`pss_name`) VALUES ('" + pss[i] + "');");
                }
                for(let i = 0; i < am.length; i++) {
                    queries.push("INSERT INTO `sofa`.`am` (`am_name`, `rsm_id`, `pss_id`) VALUES ('" + am[i] + "', '1', '1');");
                }
                for(let i = 0; i < accounts.length; i++) {
                    queries.push("INSERT INTO `sofa`.`account` (`sector_name`, `region_name`, `account_name`, `am_id`) VALUES ('" + accounts[i].sector + "', '" + accounts[i].region + "', '" + accounts[i].name + "', '" + accounts[i].amid + "');");
                }
                for(let i = 0; i < accountMotion.length; i++) {
                    queries.push("INSERT INTO `sofa`.`accountmotion` (`account_id`, `salesmotion_id`, `status_id`) VALUES ('" + accountMotion[i].accountid + "', '" + accountMotion[i].salesmotionid + "', '" + accountMotion[i].statusid + "');");
                }

                globalQueries = queries;

                console.log("EXECUTING: ", queries.length, "SQL STATEMENTS");
            },
            complete: function(results) {
                var error = [];
                if(results.meta.fields) {
                    if(results.meta.fields.includes(CONST_DATASET_COL_SALES_L4)) {
                        if(results.meta.fields.includes(CONST_DATASET_COL_ACCOUNT)) {
                            if(results.meta.fields.includes(CONST_DATASET_COL_AM)) {
                                if(results.meta.fields.includes(CONST_DATASET_COL_RSM)) {
                                    if(results.meta.fields.includes(CONST_DATASET_COL_PSS)) {
                                        this.processData(results);
                                    } else {
                                        error.push("Dataset does not contain an PSS column.");
                                    }
                                } else {
                                    error.push("Dataset does not contain an RSM column.");
                                }
                            } else {
                                error.push("Dataset does not contain an AM column.");
                            }
                        } else {
                            error.push("Dataset does not contain an account column.");
                        }
                    } else {
                        error.push("Dataset does not contain an L4 sales column.");
                    }
                }
                console.log(error);
            }
        });
        displayButton = true;
        this.setState({buttonText: "Processing Complete"});
        this.forceUpdate();
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleOpen.bind(this)} >
                    {this.state.buttonText}
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    filesLimit={1}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['application/csv', 'text/csv', 'application/vnd.ms-excel']}
                    showPreviews={false}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}

// STEPPER
function getSteps() {
    return ['Agree to action', 'Upload File', 'Review Actions'];
}

function executeQueries() {
    console.log("executeQueries");
    axios
        .post('/queries/run', globalQueries)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getStepContent(step) {
    switch (step) {
        case 0:
            displayButton = true;
            return (<b>This action is a destructive task.  Uploading a new file will remove the current data from <br />the database and populate with the new dataset.  <br /><br />Please be very careful with this task, it cannot be reversed!<br /><br /></b>);
        case 1:
            displayButton = true;
            return (<DropzoneDialogExample />);
        case 2:
            displayButton = true;
            return (
            <div>
                <b>We are about to execute: </b> <br /><br />
                {globalQueries.length} database entries
                <br /><br />
                Please click the following button to execute the Database data insertion.
                <Button variant="outlined" color="primary" onClick={() => executeQueries()}>Go</Button>
            </div>);
        case 3:
        default:
            return 'Unknown step';
    }
}

function HorizontalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = step => {
        return step === -1;
    };

    const isStepSkipped = step => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(prevSkipped => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                    );
                })}
            </Stepper>
        <div>
            {activeStep === steps.length ? (
            <div>
                <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                </Typography>
            </div>
                ) : (
                    <div>{getStepContent(activeStep)}
                        <Typography className={classes.instructions}></Typography>
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>Back</Button>
                            {isStepOptional(activeStep) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSkip}
                                    className={classes.button}
                                >Skip</Button>
                            )}
                            {displayButton && (

                                <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// DIALOG
function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };

    return (
    <Dialog onClose={handleClose} maxWidth="md" aria-labelledby="max-width-dialog-title" open={open}>
        <DialogTitle id="max-width-dialog-title">Set backup account</DialogTitle>
        <DialogContent style={{height:"300px"}}>
            <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
            </DialogContentText>
            <HorizontalLinearStepper />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
    );
}

function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="primary" variant="outlined" onClick={handleClickOpen}>Reset & Upload new Dataset</Button>
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
    );
}

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
                <SimpleDialogDemo />
            </CardActions>
        </Card>
    );
}

export default AdminLoggedInUploadComponent;