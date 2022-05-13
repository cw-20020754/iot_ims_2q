import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import {
  Box,
  ButtonBase,
  List,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/styles';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import { DRAWER_WIDTH } from 'common/constants';
import { useTranslation } from 'react-i18next';
import CMenuList from '../complex/MenuList/CMenuList';
import logo_iocare from 'assets/images/logo_iocare.png';

const AppSidebar = () => {
  const { t } = useTranslation();
  const sidebarShow = useSelector((state) => state.sharedInfo.sidebarShow);
  const theme = useTheme();
  const localTheme = localStorage.getItem('localTheme');

  // ----------------------------------------------------------------------

  const drawerWidth = DRAWER_WIDTH;

  const DrawerHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    boxShadow: theme.shadows[1],
  }));

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
    },
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }));

  // ----------------------------------------------------------------------
  // const hidden = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Box component="nav" aria-label="mailbox folders">
      <Drawer variant="permanent" open={sidebarShow}>
        {/*Logo Section*/}
        <DrawerHeader
          sx={{ backgroundColor: localTheme === 'dark' ? 'grey.deepdark' : '' }}
        >
          <ButtonBase disableRipple>
            <Box
              component={'img'}
              src={logo_iocare}
              sx={{
                width: '70%',
                alignItems: 'flex-start',
              }}
            />
          </ButtonBase>
          <ButtonBase
            sx={{
              alignItems: 'flex-end',
              padding: '12px',
            }}
            disableRipple
          >
            <Typography variant="h4" noWrap sx={{ lineHeight: 1.635 }}>
              {t('word.iot') + ' ' + t('word.ims')}
            </Typography>
          </ButtonBase>
        </DrawerHeader>

        <BrowserView>
          <PerfectScrollbar
            component="div"
            style={{
              paddingLeft: '12px',
              paddingRight: '16px',
            }}
          >
            <List>
              <CMenuList />
            </List>
          </PerfectScrollbar>
        </BrowserView>
        <MobileView>
          <Box sx={{ px: 2 }}>
            <CMenuList />
          </Box>
        </MobileView>
      </Drawer>
    </Box>
  );
};

export default React.memo(AppSidebar);
