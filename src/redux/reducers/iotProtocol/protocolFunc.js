import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'common/locale/i18n';
import { protocolFuncAPI } from 'api';
import { isNull } from 'common/utils';

const name = 'protocolFunc';

const initialState = {
  protocolItemList: [],
  protocolItemParams: {
    prodTypeCode: '',
    typeCode: '',
    page: 0,
    pageSize: 5,
    rowPerPage: [5, 10, 25],
  },
  totalElements: 0,
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
        xs: 3,
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
        xs: 3,
      },
    },
    {
      id: 'groupCode',
      category: 'groupCode',
      label: i18n.t('word.protocol') + ' ' + i18n.t('word.group'),
      type: 'selectBox',
      value: '',
      optionArray: [],
      size: {
        xs: 3,
      },
    },
    {
      id: 'apiId',
      category: 'apiId',
      label: i18n.t('word.api') + ' ' + i18n.t('word.id'),
      type: 'textBox',
      value: '',
      size: {
        xs: 3,
      },
    },
    {
      id: 'apiNm',
      category: 'apiNm',
      label: i18n.t('word.api') + ' ' + i18n.t('word.nm'),
      type: 'textBox',
      value: '',
      size: {
        xs: 3,
      },
    },
    {
      id: 'itemId',
      category: 'itemId',
      label: i18n.t('word.func') + ' ' + i18n.t('word.id'),
      type: 'textBox',
      value: '',
      size: {
        xs: 3,
      },
    },
    {
      id: 'itemNm',
      category: 'itemNm',
      label: i18n.t('word.func') + ' ' + i18n.t('word.nm'),
      type: 'textBox',
      value: '',
      size: {
        xs: 3,
      },
    },
    {
      id: 'valueNm',
      category: 'valueNm',
      label: i18n.t('word.value') + ' ' + i18n.t('word.nm'),
      type: 'textBox',
      value: '',
      size: {
        xs: 3,
      },
    },
    {
      id: 'apiDirectionCode',
      category: 'apiDirectionCode',
      label: i18n.t('word.api') + ' ' + i18n.t('word.direction'),
      type: 'selectBox',
      value: '',
      optionArray: [],
      size: {
        xs: 3,
      },
    },
  ],
  dataGridTitle: '',
  columnVisibilityModel: {
    prodTypeNm: true,
    typeNm: true,
    groupNm: true,
    apiId: true,
    apiNm: true,
    apiDirection: true,
    itemTypeNm: true,
    itemId: true,
    itemNm: true,
    itemDesc: true,
    itemVer: true,
    deprecatedYn: true,
    attribute: true,
    length: true,
    valueId: true,
    valueNm: true,
    valueDesc: true,
    valueDirection: true,
    mdfId: true,
    mdfDate: true,
  },
  dataGridColums: [
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
      field: 'itemTypeNm',
      headerName: i18n.t('word.func') + ' ' + i18n.t('word.type'),
      headerAlign: 'center',
    },
    {
      field: 'itemId',
      headerName: i18n.t('word.func') + ' ' + i18n.t('word.id'),
      headerAlign: 'center',
    },
    {
      field: 'itemNm',
      headerName: i18n.t('word.func') + ' ' + i18n.t('word.nm'),
      headerAlign: 'center',
    },
    {
      field: 'itemDesc',
      headerName: i18n.t('word.func') + ' ' + i18n.t('word.desc'),
      headerAlign: 'center',
    },
    {
      field: 'itemVer',
      headerName: i18n.t('word.func') + ' ' + i18n.t('word.ver'),
      headerAlign: 'center',
    },
    {
      field: 'deprecatedYn',
      headerName: i18n.t('word.deprecated'),
      headerAlign: 'center',
    },
    {
      field: 'attribute',
      headerName: i18n.t('word.attribute'),
      headerAlign: 'center',
    },
    {
      field: 'length',
      headerName: i18n.t('word.len'),
      headerAlign: 'center',
    },
    {
      field: 'valueId',
      headerName: i18n.t('word.value') + ' ' + i18n.t('word.id'),
      headerAlign: 'center',
    },
    {
      field: 'valueNm',
      headerName: i18n.t('word.value') + ' ' + i18n.t('word.nm'),
      headerAlign: 'center',
    },
    {
      field: 'valueDesc',
      headerName: i18n.t('word.value') + ' ' + i18n.t('word.desc'),
      headerAlign: 'center',
    },
    {
      field: 'valueDirection',
      headerName: i18n.t('word.value') + ' ' + i18n.t('word.direction'),
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
 * 프로토콜 기능 목록 조회
 */
export const postProtocolItemList = createAsyncThunk(
  `${name}/postProtocolItemList`,
  async (params, thunkAPI) => {
    return await protocolFuncAPI.postProtocolItemList(params);
  },
);

const protocolFunc = createSlice({
  name,
  initialState,
  reducers: {
    setProtocolItemParams(state, action) {
      const obj = action.payload;
      state.protocolItemParams = { ...state.protocolItemParams, ...obj };
    },
    setConditionSelctList(state, action) {
      const obj = action.payload;

      state.conditionList.forEach((item) => {
        if (item.id === 'typeCode') {
          item.optionArray = obj.protocolTypeList;
        } else if (item.id === 'prodTypeCode') {
          item.optionArray = obj.prodTypeList;
        } else if (item.id === 'groupCode') {
          item.optionArray = obj.protocolGroupList;
        } else if (item.id === 'apiDirectionCode') {
          item.optionArray = obj.apiReqDerectionList;
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
     * 프로토콜 기능 목록 조회
     */
    builder.addCase(postProtocolItemList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postProtocolItemList.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      const pageInfo = action.payload.data.pageInfo;
      state.protocolItemList = [];

      response.forEach((row, index) => {
        state.protocolItemList.push({ ...row, id: index });
      });

      if (state.protocolItemList.length > 0 && isNull(state.dataGridTitle)) {
        state.dataGridTitle = `${state.protocolItemList[0].prodTypeNm} / ${state.protocolItemList[0].typeNm}`;
      }

      state.totalElements = pageInfo.totalRecord;

      state.loading = false;
      state.error = false;
    });
    builder.addCase(postProtocolItemList.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const {
  setProtocolItemParams,
  setConditionSelctList,
  setDataGridTitle,
  setIsDuplicated,
  setOpenDialog,
  setDialogInfo,
  setColumnVisibilityModel,
} = protocolFunc.actions;
export default protocolFunc.reducer;
