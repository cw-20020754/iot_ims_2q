import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  return (
    <>
      <Box sx={{ mt: 1.25, mb: 1.25 }}>
        {item.type === 'item' ? (
          <NavItem key={item.id} item={item} level={1} />
        ) : (
          <NavCollapse key={item.id} menu={item} level={1} />
        )}
      </Box>
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
