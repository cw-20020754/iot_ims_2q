import React from 'react';
import Fota from './Fota';
import Main from './MainRoute';
import Auth from './Auth';
import { useRoutes } from 'react-router-dom';

const Router = () => {
  return useRoutes([Auth, Main, Fota]);
};

export default Router;
