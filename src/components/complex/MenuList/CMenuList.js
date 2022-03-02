import React from 'react';
import CNavGroup from './CNavGroup';
import { nav } from '../../../router';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const CMenuList = () => {
  const navItems = nav.map((item) => {
    return item.show && <CNavGroup key={item.id} item={item} />;
  });

  return <>{navItems}</>;
};

export default CMenuList;
