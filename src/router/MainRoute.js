import React, { lazy } from 'react';
import DashBoard from '../pages/DashBoard';
import DevIntegratedMonitor from '../pages/DeviceMonitoring';
import DeviceSearch from '../pages/DeviceSearch';
const DefaultLayout = lazy(() => import('../components/layout/DefaultLayout'));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoute = {
  path: '/',
  element: <DefaultLayout />,
  children: [
    {
      path: '/dashboard',
      element: <DashBoard />,
    },
    {
      path: '/devIntegratedMonitor',
      element: <DevIntegratedMonitor />,
    },
    {
      path: '/deviceSearch',
      element: <DeviceSearch />,
    },
  ],
};

export default MainRoute;
