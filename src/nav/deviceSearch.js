// assets
import { IconFileSearch } from '@tabler/icons';

// constant
const icons = { IconFileSearch };
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const deviceSearch = {
  id: 'deviceSearch',
  type: 'item',
  path: '/deviceSearch',
  title: '디바이스 조회 및 제어',
  icon: icons.IconFileSearch,
  show: true,
  children: [],
};

export default deviceSearch;
