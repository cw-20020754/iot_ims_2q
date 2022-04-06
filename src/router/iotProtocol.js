import React from 'react';
import i18n from 'common/locale/i18n';
import DefaultLayout from 'components/layout/DefaultLayout';
import {
  ProductByProtocol,
  ProtocolApi,
  ProtocolFunc,
} from 'pages/iotProtocol';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import PrivateRoute from './PrivateRoute';

// ==============================|| IOT PROTOCOL ROUTING ||============================== //

const iotProtocol = {
  path: '/iotProtocol',
  element: (
    <PrivateRoute>
      <DefaultLayout />
    </PrivateRoute>
  ),
  type: 'collapse',
  title: `${i18n.t('word.IoTProtocol')}`,
  icon: FeaturedPlayListIcon,
  id: 'iotProtocol',
  show: true,
  children: [
    {
      path: 'protocolApi',
      element: <ProtocolApi />,
      type: 'item',
      title: `${i18n.t('word.protocolApi')}`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.IoTProtocol')}` },
          { title: `${i18n.t('word.protocolApi')}` },
        ],
      },
      show: true,
    },
    {
      path: 'protocolFunc',
      element: <ProtocolFunc />,
      type: 'item',
      title: `${i18n.t('word.protocolFunc')}`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.IoTProtocol')}` },
          { title: `${i18n.t('word.protocolFunc')}` },
        ],
      },
      show: true,
    },
    {
      path: 'productByProtocol',
      element: <ProductByProtocol />,
      type: 'item',
      title: `${i18n.t('word.productByProtocol')}`,
      meta: {
        public: false,
        breadcrumb: [
          { title: `${i18n.t('word.IoTProtocol')}` },
          { title: `${i18n.t('word.productByProtocol')}` },
        ],
      },
      show: true,
    },
  ],
};

export default iotProtocol;
