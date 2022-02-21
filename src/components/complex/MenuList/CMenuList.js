import React from 'react';
// material-ui

// project imports
import menuItem from '../../../nav';
import CNavGroup from './CNavGroup';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const CMenuList = () => {
  const navItems = menuItem.items.map((item) => {
    return <CNavGroup key={item.id} item={item} />;
  });

  return <>{navItems}</>;
};

export default CMenuList;
