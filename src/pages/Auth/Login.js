import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  Paper,
} from '@mui/material';
import CInput from 'components/basic/CInput';
import logo_iocare from 'assets/images/logo_iocare.png';
import CButton from 'components/basic/CButton';
import { useTheme } from '@mui/styles';
import AuthStyle from './AuthStyle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import AppFooter from 'components/layout/AppFooter';
import { useTranslation } from 'react-i18next';
import rules from 'common/rules';
import { isNull, responseCheck } from 'common/utils';
import {
  executeLogin,
  setAuthencication,
  setLoginInfo,
  setUserInfo,
} from 'redux/reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated, removeCookie } from 'common/auth';
import CNotification from 'components/basic/CNotification';

const Login = () => {
  const classes = AuthStyle();
  const { t } = useTranslation();

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authError } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  // console.log('theme >> ', theme);

  const [values, setValues] = useState({
    userId: '',
    password: '',
    showPassword: false,
  });

  const setAlertMessage = (errorDesc) => {
    setOpen(true);
    if (errorDesc === 'ipNotAllow') {
      setMessage(t('desc.ipNotAllowAlert'));
    } else if (errorDesc === 'sessionTimeExpired') {
      setMessage(t('desc.sessionTimeExpiredAlert'));
    } else {
      setMessage(t('desc.loginFailAlert'));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    removeCookie('accessToken');

    // validation check
    if (checkValidation()) {
      const formData = new FormData();

      formData.append('grant_type', 'password');
      formData.append('username', values.userId);
      formData.append('password', values.password);

      const result = await dispatch(
        executeLogin({
          formData: formData,
        }),
      );
      console.log('result >> ', JSON.stringify(result));
      if (responseCheck(result)) {
        await dispatch(setLoginInfo(result));
        if (isNull(authError) && isAuthenticated()) {
          dispatch(setUserInfo(values.userId));
          dispatch(setAuthencication(true));
          navigate('/fota/firmwaremanage');
        } else {
          setAlertMessage(authError);
        }
      }
    }
  };

  const checkValidation = () => {
    let isValid = true;
    if (isNull(values.userId) || isNull(values.password)) {
      isValid = false;
    }

    return isValid;
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          marginTop: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '400px',
          opacity: 0.9,
        }}
      >
        <CNotification
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          elevation={6}
          sStyle={{ marginTop: 30, width: '50%' }}
          aStyle={{ width: '100%', fontSize: '0.9rem' }}
          vertical={'top'}
          horizontal={'center'}
          severity={'error'}
        >
          {message}
        </CNotification>
        <Card>
          <CardHeader
            avatar={
              <Box
                component="img"
                sx={{
                  maxHeight: 100,
                  maxWidth: 100,
                }}
                alt="logo"
                src={logo_iocare}
              />
            }
            title={
              <Typography variant={'h2'}>
                {t('word.iot') + ' ' + t('word.ims')}
              </Typography>
            }
            classes={{
              root: classes.cardHeaderRoot,
              content: classes.cardHeaderContent,
            }}
          />
          <CardContent
            classes={{
              root: classes.cardContent,
            }}
          >
            <Box component="form" onSubmit={handleSubmit}>
              <CInput
                margin={'normal'}
                label={t('word.userAccount')}
                fullWidth
                autoFocus
                onChange={handleChange('userId')}
                rules={{
                  conditions: [rules.emptyIdAlert(values.userId)],
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.labelResize,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {' '}
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="start"
                        size="medium"
                      >
                        <PersonIcon fontSize="inherit" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  classes: {
                    root: classes.inputFoused,
                  },
                }}
              />
              <CInput
                margin={'normal'}
                label={t('word.password')}
                onChange={handleChange('password')}
                rules={{
                  conditions: [rules.emptyPasswordAlert(values.password)],
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.labelResize,
                  },
                }}
                sx={{ fontSize: 20 }}
                type={values.showPassword ? 'text' : 'password'}
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.inputFoused,
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      {' '}
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="start"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </CardContent>
          <CardActions>
            <CButton
              fullWidth
              variant={'contained'}
              className={classes.loginBtn}
              size={'large'}
              onClick={handleSubmit}
            >
              {t('word.login')}
            </CButton>
          </CardActions>
        </Card>
      </Paper>
      <AppFooter />
    </Container>
  );
};

export default Login;
