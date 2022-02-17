import React from 'react';
import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

// project imports
import NavItem from '../NavItem';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import {
  setCollapsedOpen,
  setCurrentNav,
} from '../../../../redux/reducers/changeStateSlice';

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

const NavCollapse = ({ menu, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedNav = useSelector((state) => state.changeState.selectedNav);
  const collapsedOpen = useSelector((state) => state.changeState.collapsedOpen);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClick = () => {
    // setOpen(!open);
    // console.log('level >> ', level);
    dispatch(setCurrentNav(menu.id));
    dispatch(setCollapsedOpen(!collapsedOpen));
    // setSelected(!selected ? menu.id : null);

    // console.log('handleClick >> ', selectedNav, selectedNav.split('/').findIndex((id) => id === menu.id) > -1);
  };

  // menu collapse & item
  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return (
          item.show && <NavItem key={item.id} item={item} level={level + 1} />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon
      strokeWidth={1.5}
      size="1.3rem"
      style={{ marginTop: 'auto', marginBottom: 'auto' }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === menu.id ? 8 : 6,
        height: selected === menu.id ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: '12px',
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`,
        }}
        selected={selectedNav.split('/').findIndex((id) => id === menu.id) > -1}
        onClick={handleClick}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>
          {menuIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant={'body1'} color="inherit" sx={{ my: 'auto' }}>
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography
                variant="caption"
                sx={{ ...theme.typography.subMenuCaption }}
                display="block"
                gutterBottom
              >
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <IconChevronUp
            stroke={1.5}
            size="1rem"
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        ) : (
          <IconChevronDown
            stroke={1.5}
            size="1rem"
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        )}
      </ListItemButton>
      <Collapse in={collapsedOpen} timeout="auto">
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 1,
              background: theme.palette.primary.light,
            },
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
};

export default memo(NavCollapse);
