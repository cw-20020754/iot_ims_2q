import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';
import CNavItem from './CNavItem';
import CNavCollapse from './CNavCollapse';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const CNavGroup = ({ item }) => {
  return (
    <>
      <Box sx={{ mt: 1.25, mb: 1.25 }}>
        {item.type === 'item' ? (
          <CNavItem key={item.path} item={item} level={1} />
        ) : (
          <CNavCollapse key={item.path} menu={item} level={1} />
        )}
      </Box>
    </>
  );
};

CNavGroup.propTypes = {
  item: PropTypes.object,
};

export default CNavGroup;
