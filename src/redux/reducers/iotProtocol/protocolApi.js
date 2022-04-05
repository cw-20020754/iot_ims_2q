import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'common/locale/i18n';
import { protocolAPI } from 'api';
import { isNull } from 'common/utils';

const name = 'protocolApi';

const initialState = {
  protocolApiList: [],
  protocolApiParams: {
    prodTypeCode: '',
    typeCode: '',
  },
  openDialog: false,
  dialogInfo: {
    type: '',
    params: {},
  },
  conditionList: [
    {
      id: 'prodTypeCode',
      category: 'prodTypeCode',
      label: i18n.t('word.prod') + ' ' + i18n.t('word.type'),
      type: 'selectBox',
      value: '',
      optionArray: [],
      size: {
        xs: 6,
      },
    },
    {
      id: 'typeCode',
      category: 'typeCode',
      label: i18n.t('word.protocol') + ' ' + i18n.t('word.type'),
      type: 'selectBox',
      value: '',
      optionArray: [],
      size: {
        xs: 6,
      },
    },
  ],
  dataGridTitle: '',
  columnVisibilityModel: {
    apiSeq: false,
    prodTypeNm: true,
    typeNm: true,
    groupNm: true,
    apiId: true,
    apiNm: true,
    apiDirection: true,
    mdfId: true,
    mdfDate: true,
  },
  dataGridColums: [
    {
      field: 'apiSeq',
      hideable: false,
      hide: true,
    },
    {
      field: 'prodTypeNm',
      headerName: i18n.t('word.prod') + ' ' + i18n.t('word.type'),
      headerAlign: 'center',
    },
    {
      field: 'typeNm',
      headerName: i18n.t('word.protocol') + ' ' + i18n.t('word.type'),
      headerAlign: 'center',
    },
    {
      field: 'groupNm',
      headerName: i18n.t('word.protocol') + ' ' + i18n.t('word.group'),
      headerAlign: 'center',
    },
    {
      field: 'apiId',
      headerName: i18n.t('word.api') + ' ' + i18n.t('word.id'),
      headerAlign: 'center',
    },
    {
      field: 'apiNm',
      headerName: i18n.t('word.api') + ' ' + i18n.t('word.nm'),
      headerAlign: 'center',
    },
    {
      field: 'apiDesc',
      headerName: i18n.t('word.api') + ' ' + i18n.t('word.desc'),
      headerAlign: 'center',
    },
    {
      field: 'apiDirection',
      headerName:
        i18n.t('word.api') +
        ' ' +
        i18n.t('word.req') +
        i18n.t('word.direction'),
      headerAlign: 'center',
    },
    {
      field: 'mdfId',
      headerName: i18n.t('word.mdf') + i18n.t('word.char'),
      headerAlign: 'center',
    },
    {
      field: 'mdfDate',
      headerName: i18n.t('word.mdf') + i18n.t('word.datm'),
      headerAlign: 'center',
    },
  ],
  isDuplicated: false,
  loading: false,
  error: false,
};

/**
 * 프로토콜 API 조회
 */
export const getProtocolApi = createAsyncThunk(
  `${name}/getProtocolApi`,
  async (params, thunkAPI) => {
    return await protocolAPI.getProtocolApi(params);
  },
);

/**
 * 프로토콜 API 중복체크
 */
export const getProtocolApiDuplicateCheck = createAsyncThunk(
  `${name}/getProtocolApiDuplicateCheck`,
  async (params, thunkAPI) => {
    return await protocolAPI.getProtocolApiDuplicateCheck(params);
  },
);

/**
 * 프로토콜 API 등록
 */
export const postProtocolApi = createAsyncThunk(
  `${name}/postProtocolApi`,
  async (body, thunkAPI) => {
    return await protocolAPI.postProtocolApi(body);
  },
);

/**
 * 프로토콜 API 수정
 */
export const putProtocolApi = createAsyncThunk(
  `${name}/putProtocolApi`,
  async (body, thunkAPI) => {
    return await protocolAPI.putProtocolApi(body);
  },
);

/**
 * 프로토콜 API 삭제
 */
export const deleteProtocolApi = createAsyncThunk(
  `${name}/deleteProtocolApi`,
  async (params, thunkAPI) => {
    return await protocolAPI.deleteProtocolApi(params);
  },
);

const protocolApi = createSlice({
  name,
  initialState,
  reducers: {
    setProtocolApiParams(state, action) {
      const obj = action.payload;
      state.protocolApiParams = { ...state.protocolApiParams, ...obj };
    },
    setConditionSelctList(state, action) {
      const obj = action.payload;

      state.conditionList.forEach((item) => {
        if (item.id === 'typeCode') {
          item.optionArray = obj.protocolTypeList;
        } else if (item.id === 'prodTypeCode') {
          item.optionArray = obj.prodTypeList;
        }
      });
    },
    setOpenDialog(state, action) {
      state.openDialog = action.payload;
    },
    setDialogInfo(state, action) {
      const obj = action.payload;
      state.dialogInfo = { ...state.dialogInfo, ...obj };
    },
    setIsDuplicated(state, action) {
      state.isDuplicated = action.payload;
    },
    setDataGridTitle(state, action) {
      state.dataGridTitle = action.payload;
    },
    setColumnVisibilityModel(state, action) {
      state.columnVisibilityModel = action.payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * 프로토콜 API 조회
     */
    builder.addCase(getProtocolApi.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProtocolApi.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      state.protocolApiList = [];

      response.forEach((row, index) => {
        state.protocolApiList.push({ ...row, id: index });
      });

      if (state.protocolApiList.length > 0 && isNull(state.dataGridTitle)) {
        state.dataGridTitle = `${state.protocolApiList[0].prodTypeNm} / ${state.protocolApiList[0].typeNm}`;
      }

      state.loading = false;
      state.error = false;
    });
    builder.addCase(getProtocolApi.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 API 중복체크
     */
    builder.addCase(getProtocolApiDuplicateCheck.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProtocolApiDuplicateCheck.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      state.isDuplicated = response;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getProtocolApiDuplicateCheck.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 API 등록
     */
    builder.addCase(postProtocolApi.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postProtocolApi.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(postProtocolApi.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 API 수정
     */
    builder.addCase(putProtocolApi.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(putProtocolApi.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(putProtocolApi.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 API 삭제
     */
    builder.addCase(deleteProtocolApi.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProtocolApi.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deleteProtocolApi.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const {
  setProtocolApiParams,
  setConditionSelctList,
  setDataGridTitle,
  setIsDuplicated,
  setOpenDialog,
  setDialogInfo,
  setColumnVisibilityModel,
} = protocolApi.actions;
export default protocolApi.reducer;
