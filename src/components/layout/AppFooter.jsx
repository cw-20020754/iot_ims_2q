import React from 'react';
import { Box, Card, CardHeader, Paper, Typography } from '@mui/material';
import AppStyles from './AppStyle';
import logo from 'assets/images/logo_coway.svg';
import { useTranslation } from 'react-i18next';

const AppFooter = () => {
  const classes = AppStyles();

  const { t } = useTranslation();

  return (
    <Paper elevation={3} className={classes.bottomFooter}>
      <Card>
        <CardHeader
          avatar={
            <Box
              component="img"
              sx={{
                maxHeight: 100,
                maxWidth: 85,
                marginLeft: 2,
              }}
              alt="logo"
              src={logo}
            />
          }
          title={
            <Typography className={classes.copyRight}>
              &copy; {t('desc.copyright')}{' '}
            </Typography>
          }
          classes={{
            root: classes.footerHeaderRoot,
            content: classes.footerHeaderContent,
          }}
        />
      </Card>
    </Paper>
  );
};

export default AppFooter;
