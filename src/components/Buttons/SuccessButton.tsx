import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import theme from "../../theme/theme";

const ColorButton  = withStyles({
    root: {
        backgroundColor: green[500],
        color: theme.palette.getContrastText(green[700]),
        '&:hover': {
            backgroundColor: green[700]
        },
    },
})(Button);

const SuccessButton = (props: any) => {
    return (
        <ColorButton variant={props.variant} color="primary" {...props}>
            {props.children}
        </ColorButton>
    );
}

export default SuccessButton;