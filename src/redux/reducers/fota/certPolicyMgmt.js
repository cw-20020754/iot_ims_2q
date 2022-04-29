import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fotaAPI } from 'api';
import i18n from '../../../common/locale/i18n';
import dayjs from 'dayjs';
import { isNull } from '../../../common/utils';

const name = 'certPolicyMgmt';

const initialState = {
  firmwareInfo: null,
  certPolicyMgmt: {
    list: [],
    totalElements: 0,
  },
  certPolicyMgmtParams: {
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
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'policyDesc',
      headerName: i18n.t('word.policy') + ' ' + i18n.t('word.desc'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'policyStatus',
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
        i18n.t('word.type'),
      width: 120,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'targetId',
      headerName: i18n.t('word.serialNum'),
      width: 250,
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
      headerName: i18n.t('word.reservation') + i18n.t('word.time'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'applyCertType',
      headerName: i18n.t('word.cert') + i18n.t('word.type'),
      width: 120,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'useYn',
      headerName: i18n.t('word.use') + ' ' + i18n.t('word.yn'),
      width: 120,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'regId',
      headerName:
        i18n.t('word.mdf') + i18n.t('word.char') + ' ' + i18n.t('word.id'),
      width: 120,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'regDate',
      headerName: i18n.t('word.reg') + ' ' + i18n.t('word.datm'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'updId',
      headerName:
        i18n.t('word.mdf') + i18n.t('word.char') + ' ' + i18n.t('word.id'),
      width: 120,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'updDate',
      headerName: i18n.t('word.mdf') + ' ' + i18n.t('word.datm'),
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
  loading: false,
  error: false,
};

/**
 * 인증서 정책관리
 */

// 인증서 정책 목록 조회
export const getCertPolicyList = createAsyncThunk(
  `${name}/getCertPolicyList`,
  async (param, thunkAPI) => {
    return await fotaAPI.getCertPolicyList(param);
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
  async (policyId, thunkAPI) => {
    // console.log("postFirmware response >> ", JSON.stringify(response));
    return await fotaAPI.deleteCertPolicy(policyId);
  },
);

const certPolicyMgmt = createSlice({
  name,
  initialState,
  reducers: {
    setCertPolicyParams(state, action) {
      const obj = action.payload;
      state.certPolicyMgmtParams = { ...state.certPolicyMgmtParams, ...obj };
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
  },
  extraReducers: (builder) => {
    /**
     * 인증서 정책 목록 조회
     */
    builder.addCase(getCertPolicyList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCertPolicyList.fulfilled, (state, action) => {
      const payload = action.payload.data.payload;
      state.loading = false;
      state.error = false;

      state.certPolicyMgmt.list = [];

      if (!isNull(payload)) {
        payload.content &&
          payload.content.forEach((row, index) => {
            state.certPolicyMgmt.list.push({ id: index, ...row });
          });
      } else {
        state.certPolicyMgmt.list = initialState.certPolicyMgmt.list;
      }

      state.certPolicyMgmt.totalElements = isNull(payload)
        ? initialState.certPolicyMgmt.totalElements
        : payload.totalElements;
    });
    builder.addCase(getCertPolicyList.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 인증서 정책 등록
     */
    builder.addCase(postCertPolicy.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postCertPolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(postCertPolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 인증서 정책 수정
     */
    builder.addCase(putCertPolicy.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(putCertPolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(putCertPolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 펌웨어 삭제
     */
    builder.addCase(deleteCertPolicy.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCertPolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deleteCertPolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setCertPolicyParams, setConditionSelctList } =
  certPolicyMgmt.actions;

export default certPolicyMgmt.reducer;
