import React from 'react';
import { FirmwareManage } from '../pages/Fota';
import FotaPolicy from '../pages/Fota/FotaPolicy';
import CertPolicy from '../pages/Fota/CertPolicy';
import FotaStatus from '../pages/Fota/FotaStatus';
import FotaHistory from '../pages/Fota/FotaHistory';
import FirmwareManageDetail from '../pages/Fota/FirmwareManageDetail';
import DefaultLayout from '../components/layout/DefaultLayout';

// ==============================|| FOTA ROUTING ||============================== //

const Fota = {
  path: '/fota',
  element: <DefaultLayout />,
  children: [
    {
      path: '/fota/firmwareManage',
      element: <FirmwareManage />,
    },
    {
      path: '/fota/FirmwareManageDetail',
      element: <FirmwareManageDetail />,
    },
    {
      path: '/fota/fotaPolicy',
      element: <FotaPolicy />,
    },
    {
      path: '/fota/certPolicy',
      element: <CertPolicy />,
    },
    {
      path: '/fota/statusCheck',
      element: <FotaStatus />,
    },
    {
      path: '/fota/historyCheck',
      element: <FotaHistory />,
    },
  ],
};

export default Fota;
