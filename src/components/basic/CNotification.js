import * as React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { isNull } from 'common/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '../../redux/reducers/changeStateSlice';

const CNotification = (props) => {
  const { open, children, anchorOrigin, ...rest } = props;

  const dispatch = useDispatch();
  const {
    snackbarOpen,
    snackbarMessage,
    autoHideDuration,
    sStyle,
    aStyle,
    variant,
    elevation,
    vertical,
    horizontal,
    severity,
  } = useSelector((state) => state.changeState.snackbar);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    if (reason === 'timeout' || (!isNull(event) && event.type === 'click')) {
      dispatch(
        setSnackbar({
          snackbarOpen: false,
          snackbarMessage: '',
        }),
      );
    }
  };

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={autoHideDuration}
      sx={{ width: '30%', ...sStyle }}
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      onClose={handleClose}
      {...rest}
    >
      <Alert
        elevation={elevation}
        severity={severity}
        variant={!isNull(variant) ? variant : 'filled'}
        sx={{ width: '100%', fontSize: '0.9rem', ...aStyle }}
        onClose={handleClose}
        {...rest}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default CNotification;
