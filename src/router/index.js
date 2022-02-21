import React from 'react';
import FotaRoute from './FotaRoute';
import MainRoute from './MainRoute';
import AuthRoute from './AuthRoute';
import { useRoutes } from 'react-router-dom';

const Router = () => {
  return useRoutes([AuthRoute, MainRoute, FotaRoute]);
};

export default Router;
