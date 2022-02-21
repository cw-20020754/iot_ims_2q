import React, { lazy } from 'react';
const Login = lazy(() => import('../pages/Auth/Login'));
const AuthLayout = lazy(() => import('../components/layout/AuthLayout'));

// ==============================|| DEVICE SEARCH ROUTING ||============================== //

const Auth = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: '',
      element: <Login />,
    },
    {
      path: 'login',
      element: <Login />,
    },
  ],
};

export default Auth;
