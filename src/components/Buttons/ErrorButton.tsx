import React from 'react';
import {
    withStyles,
    Theme,
} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import theme from "../../theme/theme";

const ColorButton  = withStyles({
    root: {
        backgroundColor: red[500],
        color: theme.palette.getContrastText(red[500]),
        '&:hover': {
            backgroundColor: red[700]
        },
    },
})(Button);

const ErrorButton = (props: any) => {
    return (
        <ColorButton variant={props.variant} color="primary" {...props}>
            {props.children}
        </ColorButton>
    );
}

export default ErrorButton;