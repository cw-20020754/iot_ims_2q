import { createTheme } from '@mui/material';
import colors from '../scss/_themes-vars.module.scss';
import themeTypography from './typography';
import themePalette from './palette';
import componentStyleOverrides from './compStyleOverride';

const color = colors;

const themeOption = {
  colors: color,
  heading: color.grey900,
  paper: color.Paper,
  backgroundDefault: color.paper,
  background: color.grey200,
  backgroundSecondary: color.grey300,
  darkTextPrimary: color.grey700,
  darkTextSecondary: color.grey500,
  textDark: color.grey900,
  menuSelected: color.primaryMain,
  menuSelectedBack: color.primaryLight,
  divider: color.grey200,
  neutral: color.grey600,
  error: color.errorDark,
  temp: color.warningDark,
};
const themeDarkOption = {
  colors: color,
  heading: color.grey50,
  paper: color.grey900,
  backgroundDefault: color.darkPaper,
  background: color.grey800,
  backgroundSecondary: color.grey200,
  darkTextPrimary: color.grey200,
  darkTextSecondary: color.grey500,
  textDark: color.grey50,
  menuSelected: color.primary200,
  menuSelectedBack: color.primary800,
  divider: color.grey500,
  neutral: color.grey500,
  error: color.warningDark,
  temp: color.warningDark,
};

const theme = createTheme({
  typography: themeTypography(themeOption),
  palette: themePalette(themeOption),
  components: componentStyleOverrides(themeOption),
});

export const getDesignTokens = (mode) => ({
  mode,
  ...(mode === 'light'
    ? {
        typography: themeTypography(themeOption),
        components: componentStyleOverrides(themeOption),
        palette: themePalette(themeOption),
      }
    : {
        typography: themeTypography(themeDarkOption),
        components: componentStyleOverrides(themeDarkOption),
        palette: { mode: 'dark' },
        // palette: themePalette(themeDarkOption),
        mode: 'dark',
      }),
});

/**
 * MUI 공통 theme 정의
 */

export default theme;
