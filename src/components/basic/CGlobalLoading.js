import * as React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const CGlobalLoading = (props) => {
  const { suspense } = props;
  const isLoading = useSelector((state) => state.sharedInfo.isLoading);

  const handleClose = (event, reason) => {};

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.tooltip + 1 }}
      open={suspense || isLoading}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CGlobalLoading;
