import React from 'react';
import i18n from '../common/locale/i18n';
import DefaultLayout from '../components/layout/DefaultLayout';
import AuthManage from '../pages/AdminManage/AuthManage';
import CommonCodeManage from '../pages/AdminManage/CommonCodeManage';
import Notice from '../pages/AdminManage/Notice';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

// ==============================|| ADMINMANAGE ROUTING ||============================== //

const adminManage = {
  path: '/adminManage',
  element: <DefaultLayout />,
  type: 'collapse',
  title: `${i18n.t('word.adminManage')}`,
  icon: AdminPanelSettingsIcon,
  id: 'adminManage',
  show: true,
  children: [
    {
      path: 'authManage',
      element: <AuthManage />,
      type: 'item',
      title: `${i18n.t('word.authManage')}`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.adminManage')}` },
          { title: `${i18n.t('word.authManage')}` },
        ],
      },
      show: true,
    },
    {
      path: 'commonCodeManage',
      element: <CommonCodeManage />,
      type: 'item',
      title: `${i18n.t('word.commonCodeManage')}`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.adminManage')}` },
          { title: `${i18n.t('word.commonCodeManage')}` },
        ],
      },
      show: true,
    },
    {
      path: 'notice',
      element: <Notice />,
      type: 'item',
      title: `${i18n.t('word.notice')}`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.adminManage')}` },
          { title: `${i18n.t('word.notice')}` },
        ],
      },
      show: true,
    },
  ],
};

export default adminManage;
