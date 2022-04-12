import React, { useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import fota from './fota';
import iotProtocol from './iotProtocol';
import adminMgmt from './adminMgmt';
import auth from './auth';
import dashboard from './dashboard';
import exception from './excption';
import { history } from '../App';

export const nav = [dashboard, fota, iotProtocol, adminMgmt, auth, exception];

const Router = (history) => {
  const { pathname } = useLocation();

  return useRoutes(nav);
};

export default Router;
