import React from 'react';
import CertPolicy from '../pages/Fota/CertPolicy';
import FotaStatus from '../pages/Fota/FotaStatus';
import DefaultLayout from '../components/layout/DefaultLayout';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import i18n from '../common/locale/i18n';
import PrivateRoute from './PrivateRoute';
import FirmwareMgmt from 'pages/Fota/FirmwareMgmt';
import FirmwareMgmtDetail from 'pages/Fota/FirmwareMgmtDetail';
import FotaPolicyMgmt from 'pages/Fota/FotaPolicyMgmt';
import FotaPolicyMgmtDetail from 'pages/Fota/FotaPolicyMgmtDetail';
import CertPolicyDetail from '../pages/Fota/CertPolicyDetail';

// ==============================|| FOTA ROUTING ||============================== //

const fota = {
  path: '/fota',
  element: (
    <PrivateRoute>
      <DefaultLayout />
    </PrivateRoute>
  ),
  type: 'collapse',
  title: `${i18n.t('word.fota')}`,
  icon: FileDownloadIcon,
  id: 'fota',
  show: true,
  children: [
    {
      path: 'firmwareMgmt',
      element: <FirmwareMgmt />,
      type: 'item',
      title: `${i18n.t('word.firmwareManage')}`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.fota')}` },
          { title: `${i18n.t('word.firmwareManage')}` },
        ],
      },
      show: true,
    },
    {
      path: 'firmwareMgmtDetail',
      element: <FirmwareMgmtDetail />,
      type: 'item',
      title: `${i18n.t('word.firmwareDetail')}`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.fota')}` },
          { title: `${i18n.t('word.firmwareManage')}` },
          { title: `${i18n.t('word.firmwareDetail')}` },
        ],
      },
      show: false,
    },
    {
      path: 'fotaPolicyMgmt',
      element: <FotaPolicyMgmt />,
      type: 'item',
      title: `${i18n.t('word.fotaPolicyManage')}`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.fota')}` },
          { title: `${i18n.t('word.fotaPolicyManage')}` },
        ],
      },
      show: true,
    },
    {
      path: 'fotaPolicyMgmtDetail',
      element: <FotaPolicyMgmtDetail />,
      type: 'item',
      title: `${
        i18n.t('word.fota') + i18n.t('word.policy') + i18n.t('word.detail')
      }`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.fota')}` },
          {
            title: `${
              i18n.t('word.fota') + i18n.t('word.policy') + i18n.t('word.mgmt')
            }`,
          },
          {
            title: `${
              i18n.t('word.fota') +
              i18n.t('word.policy') +
              i18n.t('word.detail')
            }`,
          },
        ],
      },
      show: false,
    },
    {
      path: 'certPolicy',
      element: <CertPolicy />,
      type: 'item',
      title: `${i18n.t('word.certPolicyManage')}`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.fota')}` },
          { title: `${i18n.t('word.certPolicyManage')}` },
        ],
      },
      show: true,
    },
    {
      path: 'certPolicyMgmtDetail',
      element: <CertPolicyDetail />,
      type: 'item',
      title: `${
        i18n.t('word.cert') + i18n.t('word.policy') + i18n.t('word.mgmt')
      }`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.fota')}` },
          {
            title: `${
              i18n.t('word.cert') + i18n.t('word.policy') + i18n.t('word.mgmt')
            }`,
          },
          {
            title: `${
              i18n.t('word.cert') +
              i18n.t('word.policy') +
              i18n.t('word.detail')
            }`,
          },
        ],
      },
      show: false,
    },
    {
      path: 'statusCheck',
      element: <FotaStatus />,
      type: 'item',
      title: `${i18n.t('word.statusSearch')}`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.fota')}` },
          { title: `${i18n.t('word.statusSearch')}` },
        ],
      },
      show: true,
    },
  ],
};

export default fota;
