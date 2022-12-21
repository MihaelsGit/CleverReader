import { createTheme } from '@mui/material/styles';

export const clippyTheme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#187795',
        darker: '#115266',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });