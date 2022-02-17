import React from 'react';
import FotaRoutes from './FotaRoutes';
import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';

const Router = () => {
  return useRoutes([AuthRoutes, MainRoutes, FotaRoutes]);
};

export default Router;
