// assets
import { IconDeviceDesktopAnalytics } from '@tabler/icons';

// constant
const icons = { IconDeviceDesktopAnalytics };
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const deviceMonitoring = {
  id: 'devIntegratedMonitor',
  type: 'item',
  path: '/devIntegratedMonitor',
  title: '디바이스 통합 모니터링',
  show: true,
  icon: icons.IconDeviceDesktopAnalytics,
  children: [
    // {
    //   id: "devIntegratedMonitor",
    //   title: "디바이스 통합 모니터링",
    //   type: "item",
    //   url: "/devIntegratedMonitor",
    //   breadcrumbs: false,
    // },
  ],
};

export default deviceMonitoring;
