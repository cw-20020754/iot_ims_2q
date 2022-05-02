import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useLocation, useNavigate } from 'react-router-dom';
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
import AuthStyle from './AuthStyle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import AppFooter from 'components/layout/AppFooter';
import { useTranslation } from 'react-i18next';
import rules from 'common/rules';
import { isNull, responseCheck } from 'common/utils';
import {
  executeLogin,
  setLoginInfo,
  setUserInfo,
} from 'redux/reducers/auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { encryptData, isAuthenticated, removeCookie } from 'common/auth';
import { setSnackbar } from 'redux/reducers/common/sharedInfo';

const Login = () => {
  const classes = AuthStyle();
  const { t } = useTranslation();

  const location = useLocation();
  const { state } = location;
  const [initial, setInitial] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authError } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    userId: '',
    password: '',
    showPassword: false,
  });

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (initial && !isNull(state) && state.sessionExpired) {
      setInitial(false);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: t('desc.sessonExpired'),
          autoHideDuration: 3000,
          snackBarStyle: { marginTop: 30 },
        }),
      );
    }
  }, [t, state, dispatch, initial]);

  const setAlertMessage = (errorDesc) => {
    let message = '';

    if (errorDesc === 'ipNotAllow') {
      message = t('desc.ipNotAllowAlert');
    } else if (errorDesc === 'sessionTimeExpired') {
      message = t('desc.sessionTimeExpiredAlert');
    } else {
      message = t('desc.loginFailAlert');
    }
    dispatch(
      setSnackbar({
        snackbarOpen: true,
        snackbarMessage: message,
        autoHideDuration: 5000,
      }),
    );
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

      if (responseCheck(result)) {
        await dispatch(setLoginInfo(result));
        if (isNull(authError) && isAuthenticated()) {
          dispatch(setUserInfo(encryptData(values.userId)));
          navigate('/fota/firmwareMgmt');
        } else {
          setAlertMessage(authError);
        }
      } else {
        setAlertMessage(authError);
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

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormChildrenError = () => {
    setHasError(true);
  };

  const handleValidation = (e) => {
    e.target.form.userId.focus();
    e.target.form.userId.blur();

    e.target.form.password.focus();
    e.target.form.password.blur();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={3}
        classes={{
          root: classes.paperRoot,
        }}
      >
        <Card component="form" onSubmit={handleSubmit}>
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
            <Box>
              <CInput
                name={'userId'}
                margin={'normal'}
                label={t('word.userAccount')}
                fullWidth
                value={values.userId}
                onChange={handleChange('userId')}
                onValidation={(value) => rules.emptyIdAlert(value)}
                onValidationError={handleFormChildrenError}
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
                name={'password'}
                margin={'normal'}
                label={t('word.password')}
                value={values.password}
                onChange={handleChange('password')}
                onValidation={(value) => rules.emptyPasswordAlert(value)}
                onValidationError={handleFormChildrenError}
                InputLabelProps={{
                  classes: {
                    root: classes.labelResize,
                  },
                }}
                sx={{ fontSize: 20 }}
                autoComplete="on"
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
              type="submit"
              onClick={(e) => handleValidation(e)}
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
