import React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarShow } from '../redux/reducers/changeStateSlice';

const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow);
  // styles ----------------------------------------------------------------------

  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: `${theme.palette.background.paper}`,
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    boxShadow: theme.shadows[2],
  }));

  return (
    <AppBar position="fixed" open={sidebarShow} enableColorOnDark elevation={0}>
      <Toolbar>
        <IconButton
          color="neutral"
          aria-label="open drawer"
          onClick={() => {
            dispatch(setSidebarShow(!sidebarShow));
          }}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
