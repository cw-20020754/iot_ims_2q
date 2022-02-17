// assets
import { IconBrandChrome, IconHelp, IconDownload } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconDownload };

const fota = {
  id: 'fota',
  type: 'collapse',
  path: '/fota',
  title: 'FOTA',
  icon: icons.IconDownload,
  children: [
    {
      id: 'fota/firmwaremanage',
      type: 'item',
      path: '/fota/firmwaremanage',
      title: 'Firmware 관리',
      show: true,
      meta: {
        public: false,
        breadcrumb: [{ title: 'Fota' }, { title: '펌웨어관리', active: true }],
      },
    },
    {
      id: 'fota/firmwaremanageDetail',
      type: 'item',
      path: '/fota/firmwaremanageDetail',
      title: 'Firmware 관리 상세',
      show: false,
      meta: {
        public: false,
        breadcrumb: [
          { title: 'Fota' },
          { title: '펌웨어관리' },
          { title: '펌웨어관리 상세', active: true },
        ],
      },
    },
    {
      id: 'fota/fotaPolicy',
      type: 'item',
      path: '/fota/fotaPolicy',
      title: 'Fota 정책관리',
      show: true,
      meta: {
        public: false,
        breadcrumb: [
          { title: 'Fota' },
          { title: 'Fota 정책관리', active: true },
        ],
      },
    },
    {
      id: 'fota/certPolicy',
      type: 'item',
      path: '/fota/certPolicy',
      title: '인증서 정책관리',
      show: true,
      meta: {
        public: false,
        breadcrumb: [
          { title: 'Fota' },
          { title: '인증서 정책관리', active: true },
        ],
      },
    },
    {
      id: 'fota/statusCheck',
      type: 'item',
      path: '/fota/statusCheck',
      title: '상태 조회',
      show: true,
      meta: {
        public: false,
        breadcrumb: [{ title: 'Fota' }, { title: '상태 조회', active: true }],
      },
    },
    {
      id: 'fota/historyCheck',
      type: 'item',
      path: '/fota/historyCheck',
      title: '이력 조회',
      show: true,
      meta: {
        public: false,
        breadcrumb: [{ title: 'Fota' }, { title: '이력 조회', active: true }],
      },
    },
  ],
};

export default fota;
