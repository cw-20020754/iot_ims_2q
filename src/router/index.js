import React from 'react';
import fota from './fota';
import iotProtocol from './iotProtocol';
import adminManage from './adminManage';
import auth from './auth';
import dashboard from './dashboard';
import { useRoutes } from 'react-router-dom';

export const nav = [dashboard, fota, iotProtocol, adminManage, auth];

const Router = () => {
  return useRoutes(nav);
};

export default Router;
