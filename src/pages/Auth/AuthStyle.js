import React from 'react';
import { makeStyles } from '@mui/styles';

const AuthStyle = makeStyles((theme) => ({
  cardHeaderRoot: {
    alignItems: 'baseline',
    padding: '24px 24px 0px',
    justifyContent: 'space-between',
  },
  cardHeaderContent: {
    flex: '0 0 auto',
  },
  cardContent: {
    padding: '24px',
  },
  labelResize: {
    fontSize: '0.95rem',
    lineHeight: '1.2375em',
  },
  inputFoused: {
    '&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
    '&.Mui-error .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: theme.palette.error.main,
    },
  },
  loginBtn: {
    color: theme.palette.common.white,
    fontSize: '0.8rem',
  },
}));

export default AuthStyle;
