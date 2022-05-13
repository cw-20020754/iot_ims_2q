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
    grey: {
      light: theme.colors?.grey50,
      main: theme.colors?.grey500,
      dark: theme.colors?.grey800,
      deepdark: theme.colors?.grey900,
    },
  };
}
