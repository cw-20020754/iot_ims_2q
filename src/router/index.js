import React from 'react';
import FotaRoutes from './FotaRoute';
import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoute';
import AuthRoutes from './AuthRoute';

const Router = () => {
  return useRoutes([AuthRoutes, MainRoutes, FotaRoutes]);
};

export default Router;
