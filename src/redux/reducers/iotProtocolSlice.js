import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { prodByProtocolAPI } from 'api';
import { isNull } from 'common/utils';
import { reformatCheckList } from 'common/iotProtocol';
import i18n from 'common/locale/i18n';

const name = 'iotProtocol';

const initialState = {
  loading: false,
  error: false,
  protocolApiList: {
    id: 'root',
    name: '전체',
    children: [],
  },
  usedProtocolList: {
    id: 'root',
    name: i18n.t('word.use'),
    children: [],
  },
  unusedProtocolList: {
    id: 'root',
    name: i18n.t('word.unused'),
    children: [],
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
        lg: 3,
        md: 2,
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
        xs: 6,
        lg: 6,
        md: 8,
      },
      rules: 'requireAlert',
    },
  ],
  columnVisibilityModel: {
    prodTypeNm: true,
    typeNm: true,
    devModelCode: true,
    groupNm: true,
    apiId: true,
    apiNm: true,
    apiDesc: true,
    apiDirection: true,
    itemTypeNm: true,
    itemId: true,
    itemNm: true,
    itemDesc: true,
    itemVer: true,
    itemAttrNm: true,
    length: true,
    valueId: true,
    valueNm: true,
    valueDesc: true,
    valueDirection: true,
    mdfId: true,
    mdfDate: true,
  },
  dataGridTitle: i18n.t('word.all'),
  tabDataList: [],
  protocolGroupList: [],
  protocolParams: {},
  dataRowsTotalElements: {
    list: [],
    totalElements: 0,
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
      width: 150,
    },
    {
      field: 'devModelCode',
      headerName: i18n.t('word.devModelCode'),
      headerAlign: 'center',
      width: 150,
    },
    {
      field: 'groupNm',
      headerName: i18n.t('word.protocol') + ' ' + i18n.t('word.group'),
      headerAlign: 'center',
      width: 150,
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
      width: 180,
    },
    {
      field: 'apiDirection',
      headerName:
        i18n.t('word.api') +
        ' ' +
        i18n.t('word.req') +
        i18n.t('word.direction'),
      headerAlign: 'center',
      width: 150,
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
      field: 'itemAttrNm',
      headerName: i18n.t('word.attribute'),
      headerAlign: 'center',
    },
    {
      field: 'length',
      headerName: i18n.t('word.length'),
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
};

// 제품별 프로토콜 조회
export const getProtocolByProduct = createAsyncThunk(
  `${name}/getProtocolApi`,
  async (param, thunkAPI) => {
    return await prodByProtocolAPI.getProtocolByProduct(param);
  },
);

// 제품 프로토콜 변경
export const getChangeProtocolByProduct = createAsyncThunk(
  `${name}/getChangeProtocolByProduct`,
  async ({ param }, thunkAPI) => {
    // console.log('param >> ', param);
    return await prodByProtocolAPI.getChangeProtocolByProduct(param);
  },
);

// 제품별 프로토콜 저장
export const postProtocolByProduct = createAsyncThunk(
  `${name}/postProtocolByProduct`,
  async (body, thunkAPI) => {
    return await prodByProtocolAPI.postProtocolByProduct(body);
  },
);

const iotProtocolSlice = createSlice({
  name,
  initialState,
  reducers: {
    setProtocolParams(state, action) {
      state.protocolParams = action.payload;
    },
    setColumnVisibilityModel(state, action) {
      state.columnVisibilityModel = action.payload;
    },
    setDataGridTitle(state, action) {
      state.dataGridTitle = isNull(action.payload)
        ? initialState.dataGridTitle
        : action.payload;
    },
    setTabDataList(state, action) {
      const protocolGroupList = action.payload;

      if (protocolGroupList.length > 0) {
        state.tabDataList = [
          { value: '', text: i18n.t('word.all') },
          ...protocolGroupList,
        ];
      } else {
        state.tabDataList = state.tabDataList.map((item) => {
          return {
            ...item,
            list: [],
            total: 0,
          };
        });
      }
    },
    setConditionSelctList(state, action) {
      const obj = action.payload;
      state.conditionList.forEach((item) => {
        if (item.id === 'typeCode') {
          item.optionArray = obj.protocolTypeList;
        } else if (item.id === 'prodTypeCode') {
          item.optionArray = obj.prodTypeList;
        } else {
          item.optionArray = obj.devModelCodeList;
        }
      });
    },
    handleCheckLists(state, action) {
      const { type, list } = action.payload;
      state[type].children = list;
    },
    handleChangeList(state, action) {
      const { protocolApiList, usedProtocolList, unusedProtocolList } =
        action.payload;
      state.protocolApiList.children = protocolApiList
        ? protocolApiList
        : state.protocolApiList.children;
      state.usedProtocolList.children = usedProtocolList;
      state.unusedProtocolList.children = unusedProtocolList;
    },
  },
  extraReducers: {
    [getProtocolByProduct.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getProtocolByProduct.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
      const { content } = action.payload.data;

      const result =
        content &&
        content.map((item, index) => {
          return { id: index, ...item };
        });

      const tabDataList = state.tabDataList.map((item) => {
        if (isNull(item.value)) {
          return {
            ...item,
            list: result,
            total: result.length,
          };
        }

        return {
          ...item,
          list: result.filter((v) => item.value === v.groupCode),
          total: result.filter((v) => item.value === v.groupCode).length,
        };
      });

      if (result && result.length > 0) {
        state.tabDataList = tabDataList;
      } else {
        state.tabDataList = initialState.tabDataList;
      }
    },
    [getProtocolByProduct.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [getChangeProtocolByProduct.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getChangeProtocolByProduct.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
      const { data } = action.payload;

      if (!isNull(data) && !isNull(data.content)) {
        const { protocolApiList, usedProtocolList, unusedProtocolList } =
          data.content;
        state.protocolApiList.children = state.protocolApiList['children'] =
          reformatCheckList(
            'protocolApiList',
            protocolApiList,
            false,
            usedProtocolList,
          );
        state.usedProtocolList.children = state.usedProtocolList['children'] =
          reformatCheckList('usedProtocolList', usedProtocolList, false);
        state.unusedProtocolList.children = state.unusedProtocolList[
          'children'
        ] = reformatCheckList('unusedProtocolList', unusedProtocolList, false);
      }
    },
    [getChangeProtocolByProduct.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [postProtocolByProduct.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [postProtocolByProduct.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [postProtocolByProduct.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  handleChangeList,
  setProtocolParams,
  setConditionSelctList,
  setColumnVisibilityModel,
  setDataGridTitle,
  setTabDataList,
  handleCheckLists,
} = iotProtocolSlice.actions;

export default iotProtocolSlice.reducer;
