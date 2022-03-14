import React, { lazy } from 'react';
import i18n from '../common/locale/i18n';
import PageNotFound from '../pages/Exception/PageNotFound';
import AccessDeny from '../pages/Exception/AccessDeny';
import InternalError from '../pages/Exception/InternalError';
import NetworkError from '../pages/Exception/NetworkError';
const AuthLayout = lazy(() => import('../components/layout/AuthLayout'));

// ==============================|| EXCEPTION ROUTING ||============================== //

const exception = {
  path: '/',
  type: 'collapse',
  show: false,
  id: 'exception',
  children: [
    {
      path: '/accessdeny',
      element: <AccessDeny />,
      title: `${i18n.t('word.error')}`,
    },
    {
      path: '/pagenotfound',
      element: <PageNotFound />,
      title: `${i18n.t('word.error')}`,
    },
    {
      path: '/internalerror',
      element: <InternalError />,
      title: `${i18n.t('word.error')}`,
    },
    {
      path: '/networkerror',
      element: <NetworkError />,
      title: `${i18n.t('word.error')}`,
    },
  ],
};

export default exception;
