import { createTheme } from '@material-ui/core/styles';
import { TypographyStyleOptions } from '@material-ui/core/styles/createTypography';
import { featureFlag_fontWeight } from './features/data/utils/feature-flags';

const fontStack = [
  '"DM Sans"',
  'system-ui',
  '-apple-system',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  '"Noto Sans"',
  '"Liberation Sans"',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
].join(',');

const fontStyles: Record<string, TypographyStyleOptions> = {
  h1: {
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: 500,
  },
  h2: {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 500,
  },
  h3: {
    fontSize: '21px',
    lineHeight: '24px',
    fontWeight: 500,
  },
  'body-lg': {
    fontFamily: fontStack,
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'none' as const,
    fontWeight: 400,
  },
  'body-lg-bold': {
    fontFamily: fontStack,
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'none' as const,
    fontWeight: featureFlag_fontWeight(700),
  },
  'body-sm': {
    fontFamily: fontStack,
    fontSize: '12px',
    lineHeight: '20px',
    textTransform: 'none' as const,
    fontWeight: 400,
  },
  'body-sm-bold': {
    fontFamily: fontStack,
    fontSize: '12px',
    lineHeight: '20px',
    textTransform: 'none' as const,
    fontWeight: featureFlag_fontWeight(700),
  },
  'subline-lg': {
    fontFamily: fontStack,
    fontSize: '15px',
    lineHeight: '24px',
    fontWeight: featureFlag_fontWeight(700),
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  'subline-sm': {
    fontFamily: fontStack,
    fontSize: '12px',
    lineHeight: '20px',
    fontWeight: featureFlag_fontWeight(700),
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
};

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: { main: '#59A662', light: '#CDF7D2', dark: '#004708' },
    background: {
      default: '#232743',
      paper: '#232743',
      light: '#313759',
      content: '#2D3153',
      header: '#121212',
      footer: '#121212',
      cta: '#59A662',
      appBG: '#1B1E31',
      filters: {
        active: '#4C5480',
        inactive: '#262A40',
        outline: '#303550',
        footer: '#191C29',
      },
      vaults: {
        default: '#2D3153',
        defaultOutline: '#363B63',
        boostOutline: '#DB8332',
        gov: '#342763',
        govOutline: '#42477B',
        inactive: '#111321',
        inactiveOutline: '#762C2C',
      },
      snackbars: {
        bg: '#FFF',
        bgLine: '#E5E5E5',
        bgBtn: '#363B63',
        text: '#2D3153',
        error: '#DC2C10',
      },
    },
    text: {
      primary: '#F5F5FF',
      secondary: '#D0D0DA',
      disabled: '#8A8EA8',
    },
  },
  typography: {
    fontFamily: fontStack,
    h1: fontStyles['h1'],
    h2: fontStyles['h2'],
    h3: fontStyles['h3'],
    button: fontStyles['body-lg-bold'],
    body1: fontStyles['body-lg'],
    body2: fontStyles['body-lg'],
    'body-lg': fontStyles['body-lg'],
    'body-lg-bold': fontStyles['body-lg-bold'],
    'body-sm': fontStyles['body-sm'],
    'body-sm-bold': fontStyles['body-sm-bold'],
    'subline-lg': fontStyles['subline-lg'],
    'subline-sm': fontStyles['subline-sm'],
    h4: {
      color: 'red', // DO NOT USE
    },
    h5: {
      color: 'red', // DO NOT USE
    },
    h6: {
      color: 'red', // DO NOT USE
    },
    caption: {
      color: 'red', // DO NOT USE
    },
    subtitle1: {
      color: 'red', // DO NOT USE
    },
    subtitle2: {
      color: 'red', // DO NOT USE
    },
    overline: {
      color: 'red', // DO NOT USE
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1296,
      xl: 1920,
    },
  },
  overrides: {
    MuiInputBase: {
      input: fontStyles['body-lg-bold'],
    },
  },
});

export { theme };
