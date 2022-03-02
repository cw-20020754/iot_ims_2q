import React from 'react';
import { FirmwareManage } from '../pages/Fota';
import FotaPolicy from '../pages/Fota/FotaPolicy';
import CertPolicy from '../pages/Fota/CertPolicy';
import FotaStatus from '../pages/Fota/FotaStatus';
import FotaHistory from '../pages/Fota/FotaHistory';
import FirmwareManageDetail from '../pages/Fota/FirmwareManageDetail';
import DefaultLayout from '../components/layout/DefaultLayout';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import i18n from '../common/locale/i18n';

// ==============================|| FOTA ROUTING ||============================== //

const fota = {
  path: '/fota',
  element: <DefaultLayout />,
  type: 'collapse',
  title: `${i18n.t('word.fota')}`,
  icon: FileDownloadIcon,
  id: 'fota',
  show: true,
  children: [
    {
      path: 'firmwareManage',
      element: <FirmwareManage />,
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
      path: 'firmwareManageDetail',
      element: <FirmwareManageDetail />,
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
      path: 'fotaPolicy',
      element: <FotaPolicy />,
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
    {
      path: 'historyCheck',
      element: <FotaHistory />,
      type: 'item',
      title: `${i18n.t('word.historySearch')}`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.fota')}` },
          { title: `${i18n.t('word.historySearch')}` },
        ],
      },
      show: true,
    },
  ],
};

export default fota;
