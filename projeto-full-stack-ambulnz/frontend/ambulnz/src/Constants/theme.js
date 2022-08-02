import { createTheme } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';
const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: yellow[500],
    },
  },
});
export default theme;