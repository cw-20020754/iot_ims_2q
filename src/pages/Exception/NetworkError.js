import React from 'react';
import Container from '@mui/material/Container';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import CButton from '../../components/basic/CButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NetworkError = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // console.log('theme >> ', theme);
  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Typography variant={'h2'}> {t('desc.networkError')}</Typography>
        <CButton
          variant={'contained'}
          sx={{ color: theme.palette.common.white, width: '50%', marginTop: 2 }}
          onClick={() => navigate('/')}
        >
          {t('desc.goHome')}
        </CButton>
      </Grid>
    </Container>
  );
};

export default NetworkError;
