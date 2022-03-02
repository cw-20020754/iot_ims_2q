import React from 'react';
import { FirmwareManage } from '../pages/Fota';
import LayoutSample from '../pages/AdminManage/LayoutSample';
import DefaultLayout from '../components/layout/DefaultLayout';

// ==============================|| FOTA ROUTING ||============================== //

const Admin = {
  path: '/admin',
  element: <DefaultLayout />,
  children: [
    {
      path: 'layoutSample',
      element: <LayoutSample />,
    },
  ],
};

export default Admin;
