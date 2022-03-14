import React from 'react';
import i18n from '../common/locale/i18n';
import DefaultLayout from '../components/layout/DefaultLayout';
import RoleMgmt from '../pages/AdminMgmt/RoleMgmt';
import ComCodeMgmt from '../pages/AdminMgmt/ComCodeMgmt';
import Notice from '../pages/AdminMgmt/Notice';
import LayoutSample from '../pages/AdminMgmt/LayoutSample';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PrivateRoute from './PrivateRoute';

// ==============================|| Admin 관리 (adminMgmt) ROUTING ||============================== //

const mainMenuNm = `${i18n.t('word.admin') + ' ' + i18n.t('word.mgmt')}`;
const subMenuNmList = [
  `${i18n.t('word.role') + ' ' + i18n.t('word.mgmt')}`,
  `${
    i18n.t('word.com') + ' ' + i18n.t('word.code') + ' ' + i18n.t('word.mgmt')
  }`,
  `${i18n.t('word.notice')}`,
];

const adminMgmt = {
  path: '/adminMgmt',
  element: (
    <PrivateRoute>
      <DefaultLayout />
    </PrivateRoute>
  ),
  type: 'collapse',
  title: mainMenuNm,
  icon: AdminPanelSettingsIcon,
  id: 'adminMgmt',
  show: true,
  children: [
    {
      path: 'roleMgmt',
      element: <RoleMgmt />,
      type: 'item',
      title: subMenuNmList[0],
      meta: {
        public: false,
        breadcrumb: [{ title: mainMenuNm }, { title: subMenuNmList[0] }],
      },
      show: true,
    },
    {
      path: 'comCodeMgmt',
      element: <ComCodeMgmt />,
      type: 'item',
      title: subMenuNmList[1],
      meta: {
        public: false,
        breadcrumb: [{ title: mainMenuNm }, { title: subMenuNmList[1] }],
      },
      show: true,
    },
    {
      path: 'notice',
      element: <Notice />,
      type: 'item',
      title: subMenuNmList[2],
      meta: {
        public: false,
        breadcrumb: [{ title: mainMenuNm }, { title: subMenuNmList[2] }],
      },
      show: true,
    },
    {
      path: 'layoutSample',
      element: <LayoutSample />,
      type: 'item',
      title: 'Layout Sample',
      meta: {
        public: false,
        breadcrumb: [{ title: mainMenuNm }, { title: 'Layout Sample' }],
      },
      show: true,
    },
  ],
};

export default adminMgmt;
