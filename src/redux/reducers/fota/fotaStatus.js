import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fotaAPI } from 'api';
import i18n from '../../../common/locale/i18n';
import dayjs from 'dayjs';
import { setFotaPolicyMgmtParams } from './fotaPolicyMgmt';
import { isNull } from '../../../common/utils';

const name = 'fotaStatus';

const initialState = {
  fotaStatus: {
    list: [],
    totalElements: 0,
  },
  fotaHistory: {
    list: [],
    totalElements: 0,
  },
  fotaStatusParams: {
    page: 0,
    size: 25,
    rowPerPage: [25, 50, 100],
  },
  detailedGridColums: [
    {
      field: 'apiSeq',
      hideable: false,
      hide: true,
    },
    {
      field: 'wifiFileName',
      headerName:
        i18n.t('word.wifi') +
        ' ' +
        i18n.t('word.firmware') +
        ' ' +
        i18n.t('word.file') +
        ' ' +
        i18n.t('word.nm'),
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'wifiFrmwrVer',
      headerName:
        i18n.t('word.wifi') +
        ' ' +
        i18n.t('word.firmware') +
        ' ' +
        i18n.t('word.ver'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'wifiFileSize',
      headerName:
        i18n.t('word.wifi') +
        ' ' +
        i18n.t('word.firmware') +
        ' ' +
        i18n.t('word.file') +
        ' ' +
        i18n.t('word.size'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'wifiFileUrl',
      headerName:
        i18n.t('word.wifi') +
        ' ' +
        i18n.t('word.firmware') +
        ' ' +
        i18n.t('word.file') +
        ' ' +
        i18n.t('word.url'),
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'wifiFotaStatus',
      headerName:
        i18n.t('word.wifi') +
        ' ' +
        i18n.t('word.fota') +
        ' ' +
        i18n.t('word.status'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'mcuFileName',
      headerName:
        i18n.t('word.mcu') +
        ' ' +
        i18n.t('word.firmware') +
        ' ' +
        i18n.t('word.file') +
        ' ' +
        i18n.t('word.nm'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'mcuFrmwrVer',
      headerName:
        i18n.t('word.mcu') +
        ' ' +
        i18n.t('word.firmware') +
        ' ' +
        i18n.t('word.ver'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'mcuFileSize',
      headerName:
        i18n.t('word.mcu') +
        ' ' +
        i18n.t('word.firmware') +
        ' ' +
        i18n.t('word.file') +
        ' ' +
        i18n.t('word.size'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'mcuFileUrl',
      headerName:
        i18n.t('word.mcu') +
        ' ' +
        i18n.t('word.file') +
        ' ' +
        i18n.t('word.url'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'mcuFotaStatus',
      headerName:
        i18n.t('word.mcu') +
        ' ' +
        i18n.t('word.fota') +
        ' ' +
        i18n.t('word.status'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'certStatus',
      headerName: i18n.t('word.cert') + ' ' + i18n.t('word.status'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'certStatusName',
      headerName: i18n.t('word.cert') + ' ' + i18n.t('word.status'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'isCertExpired',
      headerName:
        i18n.t('word.cert') +
        ' ' +
        i18n.t('word.expired') +
        ' ' +
        i18n.t('word.expected') +
        ' ' +
        i18n.t('word.yn'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'regId',
      headerName: i18n.t('word.regId'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'regDate',
      headerName: i18n.t('word.regDate'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'updId',
      headerName: i18n.t('word.updId'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'updDate',
      headerName: i18n.t('word.updDate'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
  ],
  dataGridColums: [
    {
      field: 'apiSeq',
      hideable: false,
      hide: true,
    },
    {
      field: 'serial',
      headerName: i18n.t('word.serialNum'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'devModelCode',
      headerName: i18n.t('word.devModelCode'),
      width: 120,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'fotaShadowStatusName',
      headerName: i18n.t('word.fota') + ' ' + i18n.t('word.status'),
      width: 120,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'certShadowStatusName',
      headerName: i18n.t('word.cert') + ' ' + i18n.t('word.status'),
      width: 120,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'regId',
      headerName:
        i18n.t('word.reg') + i18n.t('word.char') + ' ' + i18n.t('word.id'),
      width: 120,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'regDate',
      headerName: i18n.t('word.reg') + ' ' + i18n.t('word.datm'),
      width: 180,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'updId',
      headerName:
        i18n.t('word.mdf') + i18n.t('word.char') + ' ' + i18n.t('word.id'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'updDate',
      headerName: i18n.t('word.mdf') + ' ' + i18n.t('word.datm'),
      width: 180,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
  ],
  conditionList: [
    {
      id: 'datetime-local',
      category: 'startDate',
      label: i18n.t('word.term'),
      type: 'textBox',
      value: dayjs(new Date())
        .add(-7, 'days')
        .hour(0)
        .minute(0)
        .second(0)
        .format('YYYY-MM-DDTHH:mm'),
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'datetime-local',
      category: 'endDate',
      label: i18n.t('word.term'),
      type: 'textBox',
      value: dayjs(new Date())
        .hour(23)
        .minute(59)
        .second(59)
        .format('YYYY-MM-DDTHH:mm'),
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'fotaStatus',
      category: 'fotaStatus',
      label: i18n.t('word.fota') + ' ' + i18n.t('word.status'),
      type: 'selectBox',
      optionArray: [],
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'certStatus',
      category: 'certStatus',
      label: i18n.t('word.cert') + ' ' + i18n.t('word.status'),
      type: 'selectBox',
      optionArray: [],
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'devModelCode',
      category: 'devModelCode',
      label: i18n.t('word.devModelCode'),
      type: 'autoSelectBox',
      value: '',
      getValue: 'devModelCode',
      getOption: 'desc',
      optionArray: [],
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'serial',
      category: 'serial',
      label: i18n.t('word.serialNum'),
      type: 'textBox',
      value: '',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
  ],
  dialogDataGridColums: [
    {
      field: 'originDt',
      headerName: i18n.t('word.originDt'),
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'devModelCode',
      headerName: i18n.t('word.devModelCode'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'serial',
      headerName: i18n.t('word.serialNum'),
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'certStatus',
      headerName: i18n.t('word.cert') + ' ' + i18n.t('word.status'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'wifiFotaStatus',
      headerName:
        i18n.t('word.wifi') +
        ' ' +
        i18n.t('word.fota') +
        ' ' +
        i18n.t('word.status'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'wifiFrmwrVer',
      headerName:
        i18n.t('word.wifi') +
        ' ' +
        i18n.t('word.firmware') +
        ' ' +
        i18n.t('word.ver'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'mcuFotaStatus',
      headerName:
        i18n.t('word.mcu') +
        ' ' +
        i18n.t('word.fota') +
        ' ' +
        i18n.t('word.status'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'mcuFrmwrVer',
      headerName:
        i18n.t('word.mcu') +
        ' ' +
        i18n.t('word.firmware') +
        ' ' +
        i18n.t('word.ver'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'isCertExpired',
      headerName:
        i18n.t('word.cert') +
        ' ' +
        i18n.t('word.expired') +
        ' ' +
        i18n.t('word.expected') +
        ' ' +
        i18n.t('word.yn'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'queryType',
      headerName: i18n.t('word.query') + ' ' + i18n.t('word.type'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'regId',
      headerName: i18n.t('word.regId'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'regDate',
      headerName: i18n.t('word.regDate'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'updId',
      headerName: i18n.t('word.updId'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'updDate',
      headerName: i18n.t('word.updDate'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
  ],
  dialogConditionList: [
    {
      id: 'datetime-local',
      category: 'startDate',
      label: i18n.t('word.term'),
      type: 'textBox',
      value: dayjs(new Date())
        .add(-7, 'days')
        .hour(0)
        .minute(0)
        .second(0)
        .format('YYYY-MM-DDTHH:mm'),
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'datetime-local',
      category: 'endDate',
      label: i18n.t('word.term'),
      type: 'textBox',
      value: dayjs(new Date())
        .hour(23)
        .minute(59)
        .second(59)
        .format('YYYY-MM-DDTHH:mm'),
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'certStatus',
      category: 'certStatus',
      label: i18n.t('word.cert') + ' ' + i18n.t('word.status'),
      type: 'selectBox',
      optionArray: [],
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
  ],
  dialogParams: {
    page: 0,
    size: 5,
    rowPerPage: [5, 10, 20],
  },
  loading: false,
  error: false,
};

/**
 * 상태 조회
 */

// 상태 조회
export const getStatusList = createAsyncThunk(
  `${name}/getStatusList`,
  async (param, thunkAPI) => {
    return await fotaAPI.getStatusList(param);
  },
);

// 상태 삭제
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
  async (param, thunkAPI) => {
    return await fotaAPI.getHistoryList(param);
  },
);

const fotaStatus = createSlice({
  name,
  initialState,
  reducers: {
    setFotaStatusParams(state, action) {
      const obj = action.payload;
      state.fotaStatusParams = { ...state.fotaStatusParams, ...obj };
    },
    setDialogParams(state, action) {
      const obj = action.payload;
      if (obj === 'initialState') {
        state.dialogParams = initialState.dialogParams;
      } else {
        state.dialogParams = { ...state.dialogParams, ...obj };
      }
    },
    setConditionSelctList(state, action) {
      const obj = action.payload;
      state.conditionList.forEach((item) => {
        if (item.id === 'certStatus') {
          item.optionArray = obj.certStatusList;
        } else if (item.id === 'fotaStatus') {
          item.optionArray = obj.fotaStatusList;
        } else if (item.id === 'devModelCode') {
          item.optionArray = obj.devModelCodeList;
        }
      });
    },
    setDialogConditionSelectList(state, action) {
      const obj = action.payload;
      state.dialogConditionList.forEach((item) => {
        if (item.id === 'certStatus') {
          item.optionArray = obj.certStatusList;
        }
      });
    },
  },
  extraReducers: (builder) => {
    /**
     * 상태 조회
     */
    builder.addCase(getStatusList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getStatusList.fulfilled, (state, action) => {
      const payload = action.payload.data.payload;

      state.fotaStatus.list = [];

      if (!isNull(payload)) {
        payload.content &&
          payload.content.forEach((row, index) => {
            state.fotaStatus.list.push({ id: index, ...row });
          });
      } else {
        state.fotaStatus.list = initialState.fotaStatus.list;
      }

      state.fotaStatus.totalElements = isNull(payload)
        ? initialState.fotaStatus.totalElements
        : payload.totalElements;

      state.loading = false;
      state.error = false;
    });
    builder.addCase(getStatusList.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     *  상태 삭제
     */
    builder.addCase(deleteStatus.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deleteStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     *  상태 이력
     */
    builder.addCase(getHistoryList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getHistoryList.fulfilled, (state, action) => {
      const payload = action.payload.data.payload;

      state.fotaHistory.list = [];

      if (!isNull(payload)) {
        payload.content &&
          payload.content.forEach((row, index) => {
            state.fotaHistory.list.push({ id: index, ...row });
          });
      } else {
        state.fotaHistory.list = initialState.fotaHistory.list;
      }

      state.fotaHistory.totalElements = isNull(payload)
        ? initialState.fotaHistory.totalElements
        : payload.totalElements;

      state.loading = false;
      state.error = false;
    });
    builder.addCase(getHistoryList.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const {
  setFotaStatusParams,
  setConditionSelctList,
  setDialogParams,
  setDialogConditionSelectList,
} = fotaStatus.actions;

export default fotaStatus.reducer;
