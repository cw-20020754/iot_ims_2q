import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { forwardRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const CNavItem = ({ item, level, path }) => {
  const theme = useTheme();
  const { pathname } = useLocation();

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: 6,
        height: 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    // eslint-disable-next-line react/display-name
    component: forwardRef((props, ref) => (
      <Link
        ref={ref}
        {...props}
        to={level > 1 ? `${path}/${item.path}` : `${item.id}`}
        target={itemTarget}
      />
    )),
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.path, target: itemTarget };
  }

  const itemHandler = (path) => {};

  useEffect(() => {}, []);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: '12px',
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      selected={
        pathname
          .toString()
          .split('/')
          .findIndex((id) => id.toLowerCase() === item.path.toLowerCase()) > -1
      }
      onClick={() => itemHandler(item.path)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant={
              pathname
                .toString()
                .split('/')
                .findIndex((id) => id === item.path) > -1
                ? 'h5'
                : 'body1'
            }
            color="inherit"
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.subMenuCaption }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
    </ListItemButton>
  );
};

CNavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default memo(CNavItem);
