import * as React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { isNull } from 'common/utils';

const CNotification = (props) => {
  const {
    open,
    autoHideDuration,
    sStyle,
    aStyle,
    children,
    variant,
    elevation,
    vertical,
    horizontal,
    anchorOrigin,
    severity,
    ...rest
  } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      sx={sStyle}
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      {...rest}
    >
      <Alert
        elevation={elevation}
        severity={severity}
        variant={!isNull(variant) ? variant : 'filled'}
        sx={aStyle}
        {...rest}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default CNotification;
