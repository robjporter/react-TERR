import { createMuiTheme } from '@material-ui/core/styles';
import { red , green } from '@material-ui/core/colors';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1b9fd7',
      contrastText: '#fff',
    },
    secondary: {
      main: '#005073',
    },
    error: {
      main: red[400],
    },
    background: {
      default: '#fff',
    },
    success: {
      main: green[500],
      light: green[100]
    },
    text: {
      success: green[500]
    }
  },
});

export default theme;