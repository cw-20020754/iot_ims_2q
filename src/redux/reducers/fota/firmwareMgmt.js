import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fotaAPI } from 'api';
import { isNull } from 'common/utils';
import dayjs from 'dayjs';
import i18n from 'common/locale/i18n';

const name = 'firmwareMgmt';

const initialState = {
  firmwareMgmt: {
    list: [],
    totalElements: 0,
  },
  firmwareMgmtParams: {
    page: 0,
    size: 25,
    rowPerPage: [25, 50, 100],
  },
  dataGridColums: [
    {
      field: 'apiSeq',
      hideable: false,
      hide: true,
    },
    {
      field: 'frmwrName',
      headerName: i18n.t('word.firmware') + ' ' + i18n.t('word.nm'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'frmwrDesc',
      headerName: i18n.t('word.firmware') + ' ' + i18n.t('word.desc'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'frmwrVer',
      headerName: i18n.t('word.firmware') + ' ' + i18n.t('word.ver'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'fileName',
      headerName: i18n.t('word.file') + ' ' + i18n.t('word.nm'),
      width: 300,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'frmwrType',
      headerName: i18n.t('word.firmware') + ' ' + i18n.t('word.type'),
      width: 150,
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
      field: 'fileSizeTxt',
      headerName: i18n.t('word.file') + ' ' + i18n.t('word.size'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'regId',
      headerName: i18n.t('word.regId'),
      width: 150,
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
      width: 150,
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
    {
      field: 'useYn',
      headerName: i18n.t('word.use') + ' ' + i18n.t('word.yn'),
      width: 150,
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
      id: 'frmwrType',
      category: 'frmwrType',
      label: i18n.t('word.firmware') + ' ' + i18n.t('word.type'),
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
      id: 'frmwrName',
      category: 'frmwrName',
      label: i18n.t('word.firmware') + ' ' + i18n.t('word.nm'),
      type: 'textBox',
      value: '',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'frmwrVer',
      category: 'frmwrVer',
      label: i18n.t('word.firmware') + ' ' + i18n.t('word.ver'),
      type: 'textBox',
      value: '',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
  ],
  loading: false,
  error: false,
};

/**
 * 펌웨어 관리
 */

//  펌웨어 관리 조회
export const getFirmwareList = createAsyncThunk(
  `${name}/getFirmwareList`,
  async (param, thunkAPI) => {
    return await fotaAPI.getFirmwareList(param);
  },
);

// 펌웨어 등록
export const postFirmware = createAsyncThunk(
  `${name}/postFirmware`,
  async ({ formData }, thunkAPI) => {
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
  async (frmwrId, thunkAPI) => {
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

const firmwareMgmt = createSlice({
  name,
  initialState,
  reducers: {
    setFirmwareMgmtParams(state, action) {
      const obj = action.payload;
      state.firmwareMgmtParams =
        obj === 'initialState'
          ? initialState.firmwareMgmtParams
          : { ...state.firmwareMgmtParams, ...obj };
    },
    setConditionSelctList(state, action) {
      const obj = action.payload;
      state.conditionList.forEach((item) => {
        if (item.id === 'frmwrType') {
          item.optionArray = obj.frmwrTypeList;
        } else if (item.id === 'devModelCode') {
          item.optionArray = obj.devModelCodeList;
        }
      });
    },
  },
  extraReducers: (builder) => {
    /**
     * 펌웨어 관리 조회
     */
    builder.addCase(getFirmwareList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getFirmwareList.fulfilled, (state, action) => {
      const payload = action.payload.data.payload;

      state.firmwareMgmt.list = [];

      if (!isNull(payload)) {
        payload.content &&
          payload.content.forEach((row, index) => {
            state.firmwareMgmt.list.push({ id: index, ...row });
          });
      } else {
        state.firmwareMgmt.list = initialState.firmwareMgmt.list;
      }

      state.firmwareMgmt.totalElements = isNull(payload)
        ? initialState.firmwareMgmt.totalElements
        : payload.totalElements;

      state.loading = false;
      state.error = false;
    });
    builder.addCase(getFirmwareList.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 펌웨어 등록
     */
    builder.addCase(postFirmware.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postFirmware.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(postFirmware.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 펌웨어 수정
     */
    builder.addCase(putFirmware.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(putFirmware.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(putFirmware.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 펌웨어 삭제
     */
    builder.addCase(deleteFirmware.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteFirmware.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deleteFirmware.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});
export const { setFirmwareMgmtParams, setConditionSelctList } =
  firmwareMgmt.actions;

export default firmwareMgmt.reducer;
