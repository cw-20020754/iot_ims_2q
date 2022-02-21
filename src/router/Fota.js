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
      path: 'firmwareManage',
      element: <FirmwareManage />,
    },
    {
      path: 'FirmwareManageDetail',
      element: <FirmwareManageDetail />,
    },
    {
      path: 'fotaPolicy',
      element: <FotaPolicy />,
    },
    {
      path: 'certPolicy',
      element: <CertPolicy />,
    },
    {
      path: 'statusCheck',
      element: <FotaStatus />,
    },
    {
      path: 'historyCheck',
      element: <FotaHistory />,
    },
  ],
};

export default Fota;
