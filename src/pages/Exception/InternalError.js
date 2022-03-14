import React from 'react';
import Container from '@mui/material/Container';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import CButton from 'components/basic/CButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const InternalError = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        <Typography
          variant={'h1'}
          sx={{
            fontSize: '150px',
            textShadow:
              'rgb(61 61 61 / 30%) 1px 1px, rgb(61 61 61 / 20%) 2px 2px, rgb(61 61 61 / 30%) 3px 3px',
          }}
        >
          500
        </Typography>
        <Typography variant={'h2'}>{t('desc.internalError')}</Typography>
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

export default InternalError;
