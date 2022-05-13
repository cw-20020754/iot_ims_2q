import React, { Suspense, useEffect, useState } from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import theme from './assets/theme/theme';
import { getDesignTokens } from './assets/theme/theme';
import { ColorModeContext } from './assets/theme/color-context';
import Routes from './router';
import { LicenseInfo } from '@mui/x-data-grid-pro';
import { CookiesProvider } from 'react-cookie';
import CNotification from './components/basic/CNotification';
import { createBrowserHistory } from 'history';
import CGlobalLoading from './components/basic/CGlobalLoading';
import { isNull } from './common/utils';

LicenseInfo.setLicenseKey(import.meta.env.VITE_DATAGRID_LICENSE_KEY);

export const history = createBrowserHistory({ forceRefresh: true });

const App = () => {
  const [mode, setMode] = React.useState();
  const [initial, setInitial] = useState(true);
  const localTheme = localStorage.getItem('localTheme');
  console.log('0. lcoalStorage에 있는 ', localTheme);

  useEffect(() => {
    if (initial && isNull(mode)) {
      setMode(localTheme);
      console.log('initial mode??', mode);
    }
  });

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        const currentTheme = localStorage.getItem('localTheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('localTheme', newTheme);
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <Suspense fallback={<CGlobalLoading suspense={true} />}>
      <CookiesProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CGlobalLoading />
            <CNotification />
            <Routes history={history} />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </CookiesProvider>
    </Suspense>
  );
};

export default App;
