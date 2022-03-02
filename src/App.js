import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material';
import theme from './assets/theme/theme';
import Routes from './router';
import { LicenseInfo } from '@mui/x-data-grid-pro';

LicenseInfo.setLicenseKey(process.env.REACT_APP_DATAGRID_LICENSE_KEY);

const App = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
