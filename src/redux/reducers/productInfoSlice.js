import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  call, delay, put, takeLatest,
} from 'redux-saga/effects';
import { productInfoAPI } from '../../lib/api';

const name = 'productInfo';

// export const getDeviceInfo = createAsyncThunk(
//   `${name}/getDeviceInfo`,
//   async (serial, thunkAPI) => {
//     const response = await productInfoAPI.getDeviceInfo(serial);
//     return response.data;
//   },
// );

// export const getDeviceInfoByOrderNo = createAsyncThunk(
//   `${name}/getDeviceInfoByOrderNo`,
//   async (orderNo, thunkAPI) => {
//     const response = await productInfoAPI.getSerialInfo(orderNo);
//     return response.data;
//   },
// );

const initialState = {
  loading: false,
  error: false,
  unRegistedProduct: null,
  product: {
    serial: null,
    orderNo: null,
    macAddr: null,
    productCode: null,
    prodRegDt: null,
    productLine: null,
    productLineName: null,
    devModelNm: null,
    inputDt: null,
    productName: null,
    oaqStationInfo: {
      sidoNm: null,
      sggNm: null,
      dongNm: null,
    },
  },
};

const productInfoSlice = createSlice({
  name,
  initialState,
  reducers: {
    getDeviceInfo(state, action) {
      state.loading = true;
      state.error = false;
    },
    getDeviceInfoSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    getDeviceInfoFail(state, action) {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: {
    // [getDeviceInfo.pending.type]: (state, action) => {
    //   state.loading = true;
    //   state.error = false;
    // },
    // [getDeviceInfo.fulfilled.type]: (state, action) => {
    //   state.loading = false;
    //   state.error = false;
    //   state.unRegistedProduct = action.payload.header.result === "E4000"
    //     ? initialState.unRegistedProduct = 'noRegisted' : initialState.unRegistedProduct = 'registed';
    //   state.product = action.payload.payload === null
    //     ? initialState.product : action.payload.payload;
    // },
    // [getDeviceInfo.rejected.type]: (state, action) => {
    //   state.loading = false;
    //   state.error = true;
    // },
    // [getDeviceInfoByOrderNo.pending.type]: (state, action) => {
    //   state.loading = true;
    //   state.error = false;
    // },
    // [getDeviceInfoByOrderNo.fulfilled.type]: (state, action) => {
    //   state.loading = false;
    //   state.error = false;
    //   state.unRegistedProduct = action.payload.header.result === "E4000"
    //     ? initialState.unRegistedProduct = 'noRegisted' : initialState.unRegistedProduct = 'registed';
    //   state.product = action.payload.payload === null
    //     ? initialState.product : action.payload.payload;
    // },
    // [getDeviceInfoByOrderNo.rejected.type]: (state, action) => {
    //   state.loading = false;
    //   state.error = true;
    // },
  },
});

export const { getDeviceInfo, getDeviceInfoSuccess, getDeviceInfoFail } = productInfoSlice.actions;
export default productInfoSlice.reducer;

