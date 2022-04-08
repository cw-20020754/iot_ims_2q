/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
  return {
    primary: {
      light: theme.colors?.primaryLight,
      main: theme.colors?.primaryMain,
      black: theme.colors?.grey900,
      background: theme.colors?.grey200,
      dark: theme.colors?.primaryDark,
    },
    neutral: {
      main: theme.neutral,
    },
    cancel: {
      main: theme.colors?.grey500,
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: theme.colors?.errorDark,
    },
    // success: {
    //   light: theme.colors?.successLight,
    //   200: theme.colors?.success200,
    //   main: theme.colors?.successMain,
    //   dark: theme.colors?.successDark,
    // },
    // primary: {
    //     light: theme.colors?.primaryLight,
    //     main: theme.colors?.primaryMain,
    //     dark: theme.colors?.primaryDark,
    //     200: theme.colors?.primary200,
    //     800: theme.colors?.primary800
    // },
    // secondary: {
    //     light: theme.colors?.secondaryLight,
    //     main: theme.colors?.secondaryMain,
    //     dark: theme.colors?.secondaryDark,
    //     200: theme.colors?.secondary200,
    //     800: theme.colors?.secondary800
    // },

    // orange: {
    //     light: theme.colors?.orangeLight,
    //     main: theme.colors?.orangeMain,
    //     dark: theme.colors?.orangeDark
    // },
    // warning: {
    //     light: theme.colors?.warningLight,
    //     main: theme.colors?.warningMain,
    //     dark: theme.colors?.warningDark
    // },

    // grey: {
    //     50: theme.colors?.grey50,
    //     100: theme.colors?.grey100,
    //     500: theme.darkTextSecondary,
    //     600: theme.heading,
    //     700: theme.darkTextPrimary,
    //     900: theme.textDark
    // },
    // dark: {
    //     light: theme.colors?.darkTextPrimary,
    //     main: theme.colors?.darkLevel1,
    //     dark: theme.colors?.darkLevel2,
    //     800: theme.colors?.darkBackground,
    //     900: theme.colors?.darkPaper
    // },
    // text: {
    //     primary: theme.darkTextPrimary,
    //     secondary: theme.darkTextSecondary,
    //     dark: theme.textDark,
    //     hint: theme.colors?.grey100
    // },
    // background: {
    //     paper: theme.paper,
    //     default: theme.backgroundDefault
    // }
  };
}
