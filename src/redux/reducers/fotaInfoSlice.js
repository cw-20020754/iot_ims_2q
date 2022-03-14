import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fotaAPI } from 'api';
import { isNull } from 'common/utils';

const name = 'fotaInfo';

const initialState = {
  firmwareInfo: null,
  firmwareMng: {
    list: [],
    totalElements: 0,
  },
  fotaPolicy: {
    list: [],
    totalElements: 0,
  },
  certPolicy: {
    list: [],
    totalElements: 0,
  },
  fotaStatus: {
    list: [],
    totalElements: 0,
  },
  fotaHistory: {
    list: [],
    totalElements: 0,
  },
  loading: false,
  error: false,
};

/**
 * 펌웨어 관리
 */
//  펌웨어 관리 리스트
export const getFirmwareList = createAsyncThunk(
  `${name}/getFirmwareList`,
  async ({ param }, thunkAPI) => {
    const response = await fotaAPI.getFirmwareList(param);
    return response.data;
  },
);

// 펌웨어 등록
export const postFirmware = createAsyncThunk(
  `${name}/postFirmware`,
  async ({ formData }, thunkAPI) => {
    // console.log("postFirmware response >> ", JSON.stringify(response));

    return await fotaAPI.postFirmware(formData);
  },
);

// 펌웨어 수정
export const putFirmware = createAsyncThunk(
  `${name}/putFirmware`,
  async ({ formData }, thunkAPI) => {
    const response = await fotaAPI.putFirmware(formData);
    return response.data;
  },
);

// 펌웨어 삭제
export const deleteFirmware = createAsyncThunk(
  `${name}/deleteFirmware`,
  async ({ frmwrId }, thunkAPI) => {
    const response = await fotaAPI.deleteFirmware(frmwrId);
    return response.data;
  },
);

// 엑셀 다운로드
export const refreshFirmwareExportList = createAsyncThunk(
  `${name}/refreshFirmwareExportList`,
  async ({ option }, thunkAPI) => {
    const response = await fotaAPI.refreshFirmwareExportList(option);
    return response.data;
  },
);

/**
 * FOTA 정책 관리
 */
// FOTA 정책 목록 조회
export const getFotaPolicyList = createAsyncThunk(
  `${name}/getFotaPolicyList`,
  async ({ param }, thunkAPI) => {
    // console.log("option >>> ", param);
    const response = await fotaAPI.getFotaPolicyList(param);
    return response.data;
  },
);
// FOTA 정책 등록
export const postFotaPolicy = createAsyncThunk(
  `${name}/postFotaPolicy`,
  async ({ formData }, thunkAPI) => {
    // console.log("postFirmware response >> ", JSON.stringify(response));
    return await fotaAPI.postFotaPolicy(formData);
  },
);
// FOTA 정책 수정
export const putFotaPolicy = createAsyncThunk(
  `${name}/putFotaPolicy`,
  async ({ formData }, thunkAPI) => {
    // console.log("postFirmware response >> ", JSON.stringify(response));
    return await fotaAPI.putFotaPolicy(formData);
  },
);
// FOTA 정책 삭제
export const deleteFotaPolicy = createAsyncThunk(
  `${name}/deleteFotaPolicy`,
  async ({ policyId }, thunkAPI) => {
    // console.log("postFirmware response >> ", JSON.stringify(response));
    return await fotaAPI.deleteFotaPolicy(policyId);
  },
);

/**
 * 인증서 정책관리
 */

// 인증서 정책 목록 조회
export const getCertPolicyList = createAsyncThunk(
  `${name}/getCertPolicyList`,
  async ({ param }, thunkAPI) => {
    const response = await fotaAPI.getCertPolicyList(param);
    return response.data;
  },
);

// 인증서 정책 등록
export const postCertPolicy = createAsyncThunk(
  `${name}/postCertPolicy`,
  async ({ formData }, thunkAPI) => {
    return await fotaAPI.postCertPolicy(formData);
  },
);

// 인증서 정책 수정
export const putCertPolicy = createAsyncThunk(
  `${name}/putFotaPolicy`,
  async ({ formData }, thunkAPI) => {
    // console.log("postFirmware response >> ", JSON.stringify(response));
    return await fotaAPI.putCertPolicy(formData);
  },
);

// 인증서 정책 삭제
export const deleteCertPolicy = createAsyncThunk(
  `${name}/deleteCertPolicy`,
  async ({ policyId }, thunkAPI) => {
    // console.log("postFirmware response >> ", JSON.stringify(response));
    return await fotaAPI.deleteCertPolicy(policyId);
  },
);

/**
 * 상태 조회
 */
export const getStatusList = createAsyncThunk(
  `${name}/getStatusList`,
  async ({ param }, thunkAPI) => {
    const response = await fotaAPI.getStatusList(param);
    return response.data;
  },
);

export const deleteStatus = createAsyncThunk(
  `${name}/deleteStatus`,
  async ({ serial }, thunkAPI) => {
    const response = await fotaAPI.deleteStatus(serial);
    return response.data;
  },
);

/**
 * 이력 조회
 */
export const getHistoryList = createAsyncThunk(
  `${name}/getHistoryList`,
  async ({ param }, thunkAPI) => {
    const response = await fotaAPI.getHistoryList(param);
    return response.data;
  },
);

const fotaInfoSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getFirmwareList.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getFirmwareList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
      const payload = action.payload.payload;

      if (isNull(payload)) {
        state.firmwareMng = initialState.firmwareMng;
      } else {
        state.firmwareMng.list = isNull(payload.content)
          ? initialState.firmwareMng.list
          : payload.content;
        state.firmwareMng.totalElements = payload.totalElements;
      }
    },
    [getFirmwareList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [postFirmware.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [postFirmware.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [postFirmware.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [putFirmware.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [putFirmware.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [putFirmware.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [deleteFirmware.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [deleteFirmware.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [deleteFirmware.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [getFotaPolicyList.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getFotaPolicyList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
      const payload = action.payload.payload;

      if (isNull(payload)) {
        state.fotaPolicy = initialState.fotaPolicy;
      } else {
        state.fotaPolicy.list = isNull(payload.content)
          ? initialState.fotaPolicy.list
          : payload.content;
        state.fotaPolicy.totalElements = payload.totalElements;
      }
    },
    [getFotaPolicyList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [postFotaPolicy.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [postFotaPolicy.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [postFotaPolicy.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [putFotaPolicy.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [putFotaPolicy.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [putFotaPolicy.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [deleteFotaPolicy.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [deleteFotaPolicy.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [deleteFotaPolicy.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [getCertPolicyList.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getCertPolicyList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
      const payload = action.payload.payload;
      if (isNull(payload)) {
        state.certPolicy = initialState.certPolicy;
      } else {
        state.certPolicy.list = isNull(payload.content)
          ? initialState.certPolicy.list
          : payload.content;
        state.certPolicy.totalElements = payload.totalElements;
      }
    },
    [getCertPolicyList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [postCertPolicy.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [postCertPolicy.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [postCertPolicy.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [putCertPolicy.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [putCertPolicy.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [putCertPolicy.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [deleteCertPolicy.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [deleteCertPolicy.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [deleteCertPolicy.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [getStatusList.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getStatusList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
      const payload = action.payload.payload;

      if (isNull(payload)) {
        state.fotaStatus = initialState.fotaStatus;
      } else {
        state.fotaStatus.list = isNull(payload.content)
          ? initialState.fotaStatus.list
          : payload.content;
        state.fotaStatus.totalElements = payload.totalElements;
      }
    },
    [getStatusList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [deleteStatus.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [deleteStatus.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [deleteStatus.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [getHistoryList.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getHistoryList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
      const payload = action.payload.payload;

      if (isNull(payload)) {
        state.fotaHistory = initialState.fotaHistory;
      } else {
        state.fotaHistory.list = isNull(payload.content)
          ? initialState.fotaHistory.list
          : payload.content;
        state.fotaHistory.totalElements = payload.totalElements;
      }
    },
    [getHistoryList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default fotaInfoSlice.reducer;
