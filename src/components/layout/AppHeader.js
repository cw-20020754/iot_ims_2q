import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import CButton from '../basic/CButton';
import { setLogoutInfo } from 'redux/reducers/auth/auth';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { persistor } from 'index';
import { decryptData } from '../../common/auth';
const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const sidebarShow = useSelector((state) => state.sharedInfo.sidebarShow);
  const { username } = useSelector((state) => state.auth);
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

  const executeLogout = async () => {
    await dispatch(setLogoutInfo());
    await persistor.purge();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" open={sidebarShow}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        {/*<IconButton*/}
        {/*  color="neutral"*/}
        {/*  aria-label="toggle drawer"*/}
        {/*  onClick={() => {*/}
        {/*    dispatch(setSidebarShow(!sidebarShow));*/}
        {/*  }}*/}
        {/*  edge="start"*/}
        {/*>*/}
        {/*  <MenuIcon />*/}
        {/*</IconButton>*/}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            noWrap
            component="div"
            color={theme.palette.primary.main}
          >
            {`${username && decryptData(username)}  ${t('word.sir')}`}
          </Typography>
          <CButton
            variant="text"
            onClick={executeLogout}
            style={{ fontSize: '0.925rem' }}
          >
            {t('word.logout')}
          </CButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
