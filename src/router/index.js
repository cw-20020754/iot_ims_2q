import React from 'react';
import fota from './fota';
import { useRoutes } from 'react-router-dom';
import iotProtocol from './iotProtocol';
import adminManage from './adminManage';
import auth from './auth';
import dashboard from './dashboard';

export const nav = [dashboard, fota, iotProtocol, adminManage, auth];

const Router = () => {
  return useRoutes(nav);
};

export default Router;
