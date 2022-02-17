// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  type: 'item',
  path: '/dashboard',
  title: 'Dashboard',
  icon: icons.IconDashboard,
  show: true,
  children: [
    // {
    //   id: "dashboard",
    //   title: "Dashboard",
    //   type: "item",
    //   url: "/dashboard",
    //   icon: icons.IconDashboard,
    //   breadcrumbs: false,
    // },
  ],
};

export default dashboard;
