import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import AppContent from './AppContent';
import AppFooter from './AppFooter';

const DefaultLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppHeader />
      <AppSidebar />
      {/* main */}
      <AppContent />
      {/* <AppFooter /> */}
    </Box>
  );
};

export default DefaultLayout;
