import { createTheme } from '@mui/material';
import colors from '../scss/_themes-vars.module.scss';
import themeTypography from './typography';
import themePalette from './palette';
import componentStyleOverrides from './compStyleOverride';

/**
 * MUI 공통 theme 정의
 */

const color = colors;

const themeOption = {
  colors: color,
  heading: color.grey900,
  paper: color.paper,
  backgroundDefault: color.paper,
  background: color.grey100,
  darkTextPrimary: color.grey700,
  darkTextSecondary: color.grey500,
  textDark: color.grey800,
  menuSelected: color.primaryMain,
  menuSelectedBack: color.primaryLight,
  divider: color.grey200,
  neutral: color.grey600,
};

const theme = createTheme({
  typography: themeTypography(themeOption),
  palette: themePalette(themeOption),
  components: componentStyleOverrides(themeOption),
});
export default theme;
