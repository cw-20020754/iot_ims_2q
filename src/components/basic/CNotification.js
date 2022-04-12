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
    snackBarStyle,
    alertStyle,
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
      sx={{ ...snackBarStyle }}
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      onClose={handleClose}
      {...rest}
    >
      <Alert
        elevation={elevation}
        severity={severity}
        variant={!isNull(variant) ? variant : 'filled'}
        sx={{
          width: '100%',
          fontSize: '0.9rem',
          alignItems: 'center',
          padding: '0 16px',
          ...alertStyle,
        }}
        onClose={handleClose}
        {...rest}
      >
        <strong>
          {typeof snackbarMessage === 'string' && snackbarMessage}
        </strong>
      </Alert>
    </Snackbar>
  );
};

export default CNotification;
