/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
//  */
// import config from '../config'

export default function themePalette(theme) {
  
  return {
    mode: theme?.customization?.navType,

    darkbg:{
      blue1:theme.colors?.darkbg1,
      blue2:theme.colors?.darkbg2,
    },

    common: {
      title1:theme.colors?.title1,
      title2:theme.colors?.title2,
      subtitle:theme.colors?.subtitle,
      bgbtn:theme.colors?.bgbtn,
      light1:theme.colors?.light1,
      light2:theme.colors?.light2,
      black: theme.colors?.darkPaper
    },
    
    primary: {
      light: theme.colors?.primaryLight,
      main: theme.colors?.primaryMain,
      dark: theme.colors?.primaryDark,
      200: theme.colors?.primary200,
      800: theme.colors?.primary800,
      light1: theme.colors?.primaryLight1
    },
    secondary: {
      light: theme.colors?.secondaryLight,
      main: theme.colors?.secondaryMain,
      dark: theme.colors?.secondaryDark,
      200: theme.colors?.secondary200,
      800: theme.colors?.secondary800
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: theme.colors?.errorDark
    },
    orange: {
      light: theme.colors?.orangeLight,
      main: theme.colors?.orangeMain,
      dark: theme.colors?.orangeDark
    },
    warning: {
      light: theme.colors?.warningLight,
      main: theme.colors?.warningMain,
      dark: theme.colors?.warningDark
    },
    success: {
      light: theme.colors?.successLight,
      200: theme.colors?.success200,
      main: theme.colors?.successMain,
      dark: theme.colors?.successDark
    },
    grey: {
      50: theme.colors?.grey50,
      100: theme.colors?.grey100,
      500: theme.darkTextSecondary,
      600: theme.heading,
      700: theme.darkTextPrimary,
      900: theme.textDark
    },
    dark: {
      light: theme.colors?.darkTextPrimary,
      main: theme.colors?.darkLevel1,
      light1: theme.colors?.darkPrimary200,
      800: theme.colors?.darkBackground,
      900: theme.colors?.darkPaper,
      dark1:theme.colors?.darkSecondaryDark,
      dark2:theme.colors?.darkSecondary200
    },
    text: {
      primary: theme.darkTextPrimary,
      secondary: theme.darkTextSecondary,
      dark: theme.textDark,
      hint: theme.colors?.grey100
    },
    background: {
      paper: theme.paper,
      default: theme.backgroundDefault
    }
  };
}
