import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fotaAPI } from 'api';
import { isNull } from 'common/utils';
import i18n from 'common/locale/i18n';
import dayjs from 'dayjs';

const name = 'fotaPolicyMgmt';

const initialState = {
  fotaPolicyMgmt: {
    list: [],
    totalElements: 0,
  },
  fotaPolicyMgmtParams: {
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
      field: 'devModelCode',
      headerName: i18n.t('word.devModelCode'),
      width: 120,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'policyName',
      headerName: i18n.t('word.policy') + ' ' + i18n.t('word.nm'),
      width: 300,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'policyDesc',
      headerName: i18n.t('word.policy') + ' ' + i18n.t('word.desc'),
      width: 300,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'policyStatusName',
      headerName: i18n.t('word.policy') + ' ' + i18n.t('word.status'),
      width: 120,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'targetType',
      headerName:
        i18n.t('word.publish') +
        ' ' +
        i18n.t('word.target') +
        ' ' +
        i18n.t('word.type'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'targetId',
      headerName: i18n.t('word.serial'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'publishType',
      headerName: i18n.t('word.publish') + ' ' + i18n.t('word.type'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'publishDate',
      headerName: i18n.t('word.reservation') + ' ' + i18n.t('word.time'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'wifiFrmwrName',
      headerName:
        i18n.t('word.wifi') +
        ' ' +
        i18n.t('word.firmware') +
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
      field: 'mcuFrmwrName',
      headerName:
        i18n.t('word.mcu') +
        ' ' +
        i18n.t('word.firmware') +
        ' ' +
        i18n.t('word.nm'),
      width: 200,
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
      width: 150,
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
    {
      field: 'regId',
      headerName:
        i18n.t('word.reg') + i18n.t('word.char') + ' ' + i18n.t('word.id'),
      width: 150,
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
      id: 'policyStatus',
      category: 'policyStatus',
      label: i18n.t('word.policy') + ' ' + i18n.t('word.status'),
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
      id: 'policyName',
      category: 'policyName',
      label: i18n.t('word.policy') + ' ' + i18n.t('word.nm'),
      type: 'textBox',
      value: '',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'targetId',
      category: 'targetId',
      label: i18n.t('word.target') + ' ' + i18n.t('word.id'),
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
      field: 'frmwrId',
      headerName: i18n.t('word.firmware') + ' ' + i18n.t('word.id'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
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
      field: 'frmwrVer',
      headerName: i18n.t('word.firmware') + ' ' + i18n.t('word.ver'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
  ],
  dialogConditionList: [
    {
      id: 'frmwrId',
      category: 'frmwrId',
      label: i18n.t('word.firmware') + ' ' + i18n.t('word.id'),
      type: 'textBox',
      value: '',
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
 * FOTA 정책 관리
 */

// FOTA 정책 목록 조회
export const getFotaPolicyList = createAsyncThunk(
  `${name}/getFotaPolicyList`,
  async (param, thunkAPI) => {
    return await fotaAPI.getFotaPolicyList(param);
  },
);
// FOTA 정책 등록
export const postFotaPolicy = createAsyncThunk(
  `${name}/postFotaPolicy`,
  async ({ formData }, thunkAPI) => {
    return await fotaAPI.postFotaPolicy(formData);
  },
);
// FOTA 정책 수정
export const putFotaPolicy = createAsyncThunk(
  `${name}/putFotaPolicy`,
  async ({ formData }, thunkAPI) => {
    return await fotaAPI.putFotaPolicy(formData);
  },
);
// FOTA 정책 삭제
export const deleteFotaPolicy = createAsyncThunk(
  `${name}/deleteFotaPolicy`,
  async (policyId, thunkAPI) => {
    return await fotaAPI.deleteFotaPolicy(policyId);
  },
);

const fotaPolicyMgmt = createSlice({
  name,
  initialState,
  reducers: {
    setFotaPolicyMgmtParams(state, action) {
      const obj = action.payload;
      state.fotaPolicyMgmtParams =
        obj === 'initialState'
          ? initialState.fotaPolicyMgmtParams
          : { ...state.fotaPolicyMgmtParams, ...obj };
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
        if (item.id === 'policyStatus') {
          item.optionArray = obj.policyStatusList;
        } else if (item.id === 'devModelCode') {
          item.optionArray = obj.devModelCodeList;
        }
      });
    },
    setDialogConditionSelectList(state, action) {
      const obj = action.payload;
      state.dialogConditionList.forEach((item) => {
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
     * FOTA 정책 목록 조회
     */
    builder.addCase(getFotaPolicyList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getFotaPolicyList.fulfilled, (state, action) => {
      const payload = action.payload.data.payload;

      state.fotaPolicyMgmt.list = [];

      if (!isNull(payload)) {
        payload.content &&
          payload.content.forEach((row, index) => {
            state.fotaPolicyMgmt.list.push({ id: index, ...row });
          });
      } else {
        state.fotaPolicyMgmt.list = initialState.fotaPolicyMgmt.list;
      }

      state.fotaPolicyMgmt.totalElements = isNull(payload)
        ? initialState.fotaPolicyMgmt.totalElements
        : payload.totalElements;

      state.loading = false;
      state.error = false;
    });
    builder.addCase(getFotaPolicyList.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     *  FOTA 정책 등록
     */
    builder.addCase(postFotaPolicy.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postFotaPolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(postFotaPolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     *  FOTA 정책 수정
     */
    builder.addCase(putFotaPolicy.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(putFotaPolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(putFotaPolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * FOTA 정책 삭제
     */
    builder.addCase(deleteFotaPolicy.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteFotaPolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deleteFotaPolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const {
  setFotaPolicyMgmtParams,
  setConditionSelctList,
  setDialogParams,
  setDialogConditionSelectList,
} = fotaPolicyMgmt.actions;

export default fotaPolicyMgmt.reducer;
