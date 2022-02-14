import React from "react";
// material-ui

// project imports
import menuItem from "../../../nav";
import NavGroup from "./NavGroup";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const navItems = menuItem.items.map((item) => {
    return <NavGroup key={item.id} item={item} />;
  });

  return <>{navItems}</>;
};

export default MenuList;
