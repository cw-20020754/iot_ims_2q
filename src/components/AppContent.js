import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { DRAWER_WIDTH } from '../common/constants';
import Breadcrumb from './Breadcrumbs';

const AppContent = () => {
  const theme = useTheme();
  const drawerWidth = DRAWER_WIDTH;
  const leftDrawerOpened = true;

  // styles ----------------------------------------------------------------------
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      ...theme.typography.mainContent,
      ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('md')]: {
          marginLeft: -(drawerWidth - 20),
          width: `calc(100% - ${drawerWidth}px)`,
        },
        [theme.breakpoints.down('md')]: {
          marginLeft: '20px',
          width: `calc(100% - ${drawerWidth}px)`,
          padding: '16px',
        },
        [theme.breakpoints.down('sm')]: {
          marginLeft: '10px',
          width: `calc(100% - ${drawerWidth}px)`,
          padding: '16px',
          marginRight: '10px',
        },
      }),
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
          marginLeft: '20px',
        },
        [theme.breakpoints.down('sm')]: {
          marginLeft: '10px',
        },
      }),
    }),
  );
  // ==============================|| MAIN LAYOUT ||============================== //

  return (
    <>
      <Main theme={theme} open={leftDrawerOpened}>
        <Breadcrumb />
        <Outlet />
      </Main>
    </>
  );
};

export default AppContent;
