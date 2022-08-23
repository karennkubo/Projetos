import { createTheme } from '@mui/material/styles';
import { green, purple, red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    error: {
        main: red.A400,
    },
  },
});

export default theme;