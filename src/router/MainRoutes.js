import React, { lazy } from "react";
const DefaultLayout = lazy(() => import("../layout/DefaultLayout"));
const DashBoard = lazy(() => import("../pages/DashBoard"));
const DevIntegratedMonitor = lazy(() => import("../pages/DeviceMonitoring"));
const DeviceSearch = lazy(() => import("../pages/DeviceSearch"));
const Login = lazy(() => import("../pages/Auth/Login"));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <DefaultLayout />,
  children: [
    {
      path: "/dashboard",
      element: <DashBoard />,
    },
    {
      path: "/devIntegratedMonitor",
      element: <DevIntegratedMonitor />,
    },
    {
      path: "/deviceSearch",
      element: <DeviceSearch />,
    },
  ],
};

export default MainRoutes;
