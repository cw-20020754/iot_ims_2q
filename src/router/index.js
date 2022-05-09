import React from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import fota from './fota';
import iotProtocol from './iotProtocol';
import adminMgmt from './adminMgmt';
import auth from './auth';
import dashboard from './dashboard';

export const nav = [dashboard, fota, iotProtocol, adminMgmt, auth];

const Router = (history) => {
  const { pathname } = useLocation();

  return useRoutes(nav);
};

export default Router;
