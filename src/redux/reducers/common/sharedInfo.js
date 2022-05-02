import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { productInfoAPI } from 'api';
import { isNull } from 'common/utils';
const name = 'sharedInfo';

const initialState = {
  sidebarShow: true,
  isLoading: false,
  toolbarItem: null,
  snackbar: {
    snackbarOpen: false,
    snackbarMessage: '',
    autoHideDuration: 0,
    snackBarStyle: {},
    alertStyle: {},
    vertical: 'top',
    horizontal: 'center',
    elevation: 6,
    severity: 'error',
    variant: 'filled',
  },
  searchConditionParams: {},
  devModelCodeList: [],
};

// 기기 모델 코드 조회
export const getDevModelCode = createAsyncThunk(
  `${name}/getDevModelCode`,
  async (param, thunkAPI) => {
    return await productInfoAPI.getDevModelCode(param);
  },
);

const sharedInfo = createSlice({
  name,
  initialState,
  reducers: {
    setSidebarShow(state, action) {
      state.sidebarShow = action.payload;
    },
    GlobalLoading(state, action) {
      state.isLoading = action.payload;
    },
    getDatagridInfo(state, action) {
      state.toolbarItem = action.payload;
    },
    setSnackbar(state, action) {
      state.snackbar = {
        ...state.snackbar,
        ...action.payload,
      };
    },
    setSearchConditionParam(state, action) {
      const param = action.payload;

      if (param) {
        state.searchConditionParams = {
          ...state.searchConditionParams,
          [param.name]: param.value,
        };
      } else {
        state.searchConditionParams = {};
      }
    },
  },
  extraReducers: {
    [getDevModelCode.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getDevModelCode.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;

      if (!isNull(action.payload)) {
        const { content } = action.payload.data;
        state.devModelCodeList = content;
      } else {
        state.devModelCodeList = initialState.devModelCodeList;
      }
    },
    [getDevModelCode.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  setSidebarShow,
  GlobalLoading,
  getDatagridInfo,
  setSnackbar,
  setSearchConditionParam,
} = sharedInfo.actions;

export default sharedInfo.reducer;
