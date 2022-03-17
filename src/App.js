import React, { Suspense, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import theme from './assets/theme/theme';
import Routes from './router';
import { LicenseInfo } from '@mui/x-data-grid-pro';
import { CookiesProvider } from 'react-cookie';
import CNotification from './components/basic/CNotification';
import { createBrowserHistory } from 'history';
import CGlobalLoading from './components/basic/CGlobalLoading';

LicenseInfo.setLicenseKey(process.env.REACT_APP_DATAGRID_LICENSE_KEY);

export const history = createBrowserHistory({ forceRefresh: true });

const App = () => {
  return (
    <Suspense fallback={<CGlobalLoading suspense={true} />}>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <CGlobalLoading />
          <CNotification />
          <Routes history={history} />
        </ThemeProvider>
      </CookiesProvider>
    </Suspense>
  );
};

export default App;
