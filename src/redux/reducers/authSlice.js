import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI } from 'api';
import { isNull } from 'common/utils';
import { HTTP_STATUS } from 'common/constants';
import { isAuthenticated, removeCookie, setCookie } from 'common/auth';

const name = 'auth';

const initialState = {
  loading: false,
  error: false,
  accessToken: null,
  refreshToken: null,
  authError: null,
  username: '',
  userTeam: '',
  apiHeaders: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
  apiFormHeaders: {
    'Content-Type': 'multipart/form-data',
    Authorization: '',
  },
  isAuthenticated: false,
};

// 로그인
export const executeLogin = createAsyncThunk(
  `${name}/executeLogin`,
  async ({ formData }, thunkAPI) => {
    return await authAPI.postToken(formData);
  },
);

const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    setLoginInfo(state, action) {
      const res = action.payload.payload;
      if (res.status !== HTTP_STATUS.SUCCESS) {
        state.authError = res.data.error_description;
        state.accessToken = initialState.accessToken;
        // console.log('authError >> ', state.authError);
        // remove cookie accessToken
        removeCookie('accessToken');
      } else {
        if (!isNull(res) && !isNull(res.data)) {
          state.authError = initialState.authError;
          state.accessToken = res.data.access_token;
          // set cookie accessToken
          setCookie('accessToken', res.data.access_token, {
            path: '/',
            maxAge: 14400,
          });
        }
        if (!isNull(state.accessToken)) {
          state.apiHeaders = {
            ...state.apiHeaders,
            Authorization: 'Bearer ' + state.accessToken,
          };
        }
      }
    },
    setLogoutInfo(state, action) {
      removeCookie('accessToken', { path: '/' });
      state.username = initialState.username;
      state.userTeam = initialState.userTeam;
      state.accessToken = initialState.accessToken;
    },
    setAuthencication(state, action) {
      state.isAuthenticated = isAuthenticated();
    },
    setUserInfo(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: {
    [executeLogin.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [executeLogin.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [executeLogin.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  setLoginInfo,
  setLogoutInfo,
  setApiHeaders,
  setAuthencication,
  setUserInfo,
} = authSlice.actions;
export default authSlice.reducer;
