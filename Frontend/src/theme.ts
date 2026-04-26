import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#d4487e',
      light: '#de9bc9',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0d523a',
    },
    background: {
      default: '#f3e3e3',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(121,27,27,0.87)',
    },
    error: {
      main: '#55b155',
    },
    success: {
      main: '#80aae2',
    },
    warning: {
      main: '#ff6f00',
    },
  },
  typography: {
    fontFamily: 'Oswald, Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 13,
    fontWeightRegular: 300,
    fontWeightMedium: 700,
  },
};

const theme = createTheme(themeOptions);
export default theme;
