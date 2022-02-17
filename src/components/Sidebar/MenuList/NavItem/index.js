import React from 'react';
import PropTypes from 'prop-types';
import { forwardRef, memo, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  setCollapsedOpen,
  setCurrentNav,
} from '../../../../redux/reducers/changeStateSlice';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
  // console.log('item, level > ', item, level);

  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedNav = useSelector((state) => state.changeState.selectedNav);
  const config = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    defaultPath: '/',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
  };

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
        to={`${config.basename}${item.path}`}
        target={itemTarget}
      />
    )),
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.path, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch(setCurrentNav(id));

    dispatch(setCollapsedOpen(level > 1));
  };

  useLayoutEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);

    if (currentIndex > -1) {
      dispatch(setCurrentNav(item.id));
    }
    // eslint-disable-next-line
  }, []);

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
        selectedNav === item.id ||
        (document.location.pathname === '/' && item.id === 'dashboard')
      }
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant={selectedNav === item.id ? 'h5' : 'body1'}
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

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default memo(NavItem);
