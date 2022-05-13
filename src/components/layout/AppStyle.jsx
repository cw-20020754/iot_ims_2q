import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import colors from 'assets/scss/_themes-vars.module.scss';

const color = colors;
// const theme = useTheme();

const AppStyles = makeStyles({
  root: {
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    width: 100,
    height: 48,
  },
  bottomFooter: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1300,
    height: 50,
  },
  copyRight: {
    fontStyle: 'italic',
    padding: '20px',
    color: color.grey700,
  },
  footerHeaderRoot: {
    padding: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerHeaderContent: {
    flex: '0 0 auto',
  },
  accordionHeader: {
    borderLeftStyle: 'solid',
    borderLeftWidth: '8px',
    borderLeftColor: color.primaryMain,
    // borderLeftColor: theme.palette.primary,
    borderRadius: '4px',
    maxHeight: '48px',
    boxShadow: 3,
    '&.Mui-expanded': {
      minHeight: 0,
      maxHeight: '48px',
    },
  },
  accordionContent: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});

export default AppStyles;
