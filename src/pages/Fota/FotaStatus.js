import React from 'react';
import { Box, Typography } from '@mui/material';
import fotaStyles from './FotaStyle';

const FotaStatus = () => {
  const classes = fotaStyles();

  return (
    <Box className={classes.root}>
      <Typography>FotaStatus</Typography>
    </Box>
  );
};

export default FotaStatus;
