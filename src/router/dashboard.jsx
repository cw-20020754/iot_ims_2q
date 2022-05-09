import React from 'react';
import DefaultLayout from '../components/layout/DefaultLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashBoard from '../pages/DashBoard';
import i18n from '../common/locale/i18n';
import PrivateRoute from './PrivateRoute';

// ==============================|| DASHBOARD ROUTING ||============================== //

const dashboard = {
  path: '/dashboard',
  element: (
    <PrivateRoute>
      <DefaultLayout />
    </PrivateRoute>
  ),
  type: 'collapse',
  title: `${i18n.t('word.dashboard')}`,
  icon: DashboardIcon,
  id: 'dashborad',
  show: true,
  // children: [
  //   {
  //     path: 'dashboard',
  //     element: <DashBoard />,
  //     type: 'item',
  //     title: `${i18n.t('word.dashboard')}`,
  //     meta: {
  //       public: false,
  //       breadcrumb: [
  //         { title: `${i18n.t('word.dashboard')}` },
  //         { title: `${i18n.t('word.dashboard')}` },
  //       ],
  //     },
  //     show: true,
  //   },
  // ],
};

export default dashboard;
