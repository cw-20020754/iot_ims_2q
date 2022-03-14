import React, { lazy } from 'react';
import i18n from '../common/locale/i18n';
import PublicRoute from './PublicRoute';
const Login = lazy(() => import('../pages/Auth/Login'));
const AuthLayout = lazy(() => import('../components/layout/AuthLayout'));

// ==============================|| AUTH ROUTING ||============================== //

const auth = {
  path: '/',
  element: (
    <PublicRoute>
      <AuthLayout />
    </PublicRoute>
  ),
  type: 'collapse',
  show: false,
  id: 'auth',
  children: [
    {
      path: '',
      element: <Login />,
      title: `${i18n.t('word.login')}`,
    },
    {
      path: 'login',
      element: <Login />,
      title: `${i18n.t('word.login')}`,
    },
  ],
};

export default auth;
