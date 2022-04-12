import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'common/locale/i18n';
import { protocolFuncAPI } from 'api';
import { isNull } from 'common/utils';
import ArticleIcon from '@mui/icons-material/Article';
import GridViewIcon from '@mui/icons-material/GridView';

const name = 'protocolFunc';

const initialState = {
  protocolFuncList: [],
  protocolFuncParams: {
    prodTypeCode: '',
    typeCode: '',
    page: 0,
    pageSize: 5,
    rowPerPage: [5, 10, 25],
  },
  totalElements: 0,
  protocolItem: {
    itemSeq: '',
    prodTypeCode: '',
    typeCode: '',
    groupCode: '',
    itemTypeCode: '',
    itemId: '',
    itemCode: '',
    length: 0,
    itemAttrNm: '',
    itemDesc: '',
  },
  protocolValue: {
    itemSeq: '',
    valueSeq: '',
    prodTypeCode: '',
    typeCode: '',
    groupCode: '',
    itemId: '',
    itemCode: '',
    valueId: '',
    valueCode: '',
    valueDirectionCode: '',
    valueDesc: '',
  },
  treeDataList: [],
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
    itemAttrNm: true,
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
      field: 'itemAttrNm',
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
 * 프로토콜 기능 + Value 목록 조회
 */
export const postProtocolFuncList = createAsyncThunk(
  `${name}/postProtocolFuncList`,
  async (params, thunkAPI) => {
    return await protocolFuncAPI.postProtocolFuncList(params);
  },
);

/**
 * 프로토콜 기능 중복체크
 */
export const getProtocolItemDuplicateCheck = createAsyncThunk(
  `${name}/getProtocolItemDuplicateCheck`,
  async (params, thunkAPI) => {
    return await protocolFuncAPI.getProtocolItemDuplicateCheck(params);
  },
);

/**
 * 프로토콜 기능 목록 조회
 */
export const postProtocolItemList = createAsyncThunk(
  `${name}/postProtocolItemList`,
  async (body, thunkAPI) => {
    return await protocolFuncAPI.postProtocolItemList(body);
  },
);

/**
 * 프로토콜 기능 조회
 */
export const getProtocolItem = createAsyncThunk(
  `${name}/getProtocolItem`,
  async (params, thunkAPI) => {
    return await protocolFuncAPI.getProtocolItem(params);
  },
);

/**
 * 프로토콜 기능 등록
 */
export const postProtocolItem = createAsyncThunk(
  `${name}/postProtocolItem`,
  async (body, thunkAPI) => {
    return await protocolFuncAPI.postProtocolItem(body);
  },
);

/**
 * 프로토콜 기능 수정
 */
export const putProtocolItem = createAsyncThunk(
  `${name}/putProtocolItem`,
  async (body, thunkAPI) => {
    return await protocolFuncAPI.putProtocolItem(body);
  },
);

/**
 * 프로토콜 기능 삭제
 */
export const deleteProtocolItem = createAsyncThunk(
  `${name}/deleteProtocolItem`,
  async (params, thunkAPI) => {
    return await protocolFuncAPI.deleteProtocolItem(params);
  },
);

/**
 * 프로토콜 Value 목록 조회
 */
export const getProtocolValueList = createAsyncThunk(
  `${name}/getProtocolValueList`,
  async (params, thunkAPI) => {
    return await protocolFuncAPI.getProtocolValueList(params);
  },
);

/**
 * 프로토콜 Value 중복체크
 */
export const getProtocolValueDuplicateCheck = createAsyncThunk(
  `${name}/getProtocolValueDuplicateCheck`,
  async (params, thunkAPI) => {
    return await protocolFuncAPI.getProtocolValueDuplicateCheck(params);
  },
);

/**
 * 프로토콜 Value 조회
 */
export const getProtocolValue = createAsyncThunk(
  `${name}/getProtocolValue`,
  async (params, thunkAPI) => {
    return await protocolFuncAPI.getProtocolValue(params);
  },
);

/**
 * 프로토콜 Value 등록
 */
export const postProtocolValue = createAsyncThunk(
  `${name}/postProtocolValue`,
  async (body, thunkAPI) => {
    return await protocolFuncAPI.postProtocolValue(body);
  },
);

/**
 * 프로토콜 Value 수정
 */
export const putProtocolValue = createAsyncThunk(
  `${name}/putProtocolValue`,
  async (params, thunkAPI) => {
    return await protocolFuncAPI.putProtocolValue(params);
  },
);

/**
 * 프로토콜 Value 삭제
 */
export const deleteProtocolValue = createAsyncThunk(
  `${name}/deleteProtocolValue`,
  async (body, thunkAPI) => {
    return await protocolFuncAPI.deleteProtocolValue(body);
  },
);

const makeTreeNodeChildren = (parentId, child) => {
  return {
    id: parentId + '|' + child.valueSeq,
    labelText: child.valueId + ' - ' + child.valueNm,
    labelInfo: child.controlYn === 'Y' ? i18n.t('word.control') : '',
    prependIcon: ArticleIcon,
  };
};

const protocolFunc = createSlice({
  name,
  initialState,
  reducers: {
    setProtocolFuncParams(state, action) {
      const obj = action.payload;
      state.protocolFuncParams = { ...state.protocolFuncParams, ...obj };
    },
    setProtocolItem(state, action) {
      const obj = action.payload;
      state.protocolItem = { ...state.protocolItem, ...obj };
    },
    setProtocolValue(state, action) {
      const obj = action.payload;
      state.protocolValue = { ...state.protocolValue, ...obj };
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
          item.optionArray = obj.apiReqDirectionList;
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
     * 프로토콜 기능 + Value 목록 조회
     */
    builder.addCase(postProtocolFuncList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postProtocolFuncList.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      const pageInfo = action.payload.data.pageInfo;
      state.protocolFuncList = [];

      response.forEach((row, index) => {
        state.protocolFuncList.push({ ...row, id: index });
      });

      if (state.protocolFuncList.length > 0 && isNull(state.dataGridTitle)) {
        state.dataGridTitle = `${state.protocolFuncList[0].prodTypeNm} / ${state.protocolFuncList[0].typeNm}`;
      }

      state.totalElements = pageInfo.totalRecord;

      state.loading = false;
      state.error = false;
    });
    builder.addCase(postProtocolFuncList.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 기능 목록 조회
     */
    builder.addCase(postProtocolItemList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postProtocolItemList.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      state.treeDataList = [];
      if (response && response.length > 0) {
        response.forEach((node) => {
          state.treeDataList.push({
            id: node.itemSeq.toString(),
            labelText: `${node.itemId} - ${node.itemNm}${
              node.deprecatedYn === 'Y' ? ' / ' + i18n.t('word.deprecated') : ''
            }`,
            labelInfo: node.count,
            prependIcon: GridViewIcon,
            children: node.count > 0 ? [{}] : [],
          });
        });
      }

      state.loading = false;
      state.error = false;
    });
    builder.addCase(postProtocolItemList.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 기능 중복체크
     */
    builder.addCase(getProtocolItemDuplicateCheck.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      getProtocolItemDuplicateCheck.fulfilled,
      (state, action) => {
        const response = action.payload.data.content;
        state.isDuplicated = response;

        state.loading = false;
        state.error = false;
      },
    );
    builder.addCase(getProtocolItemDuplicateCheck.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 기능 조회
     */
    builder.addCase(getProtocolItem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProtocolItem.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      state.protocolItem = { ...state.protocolItem, ...response };

      state.loading = false;
      state.error = false;
    });
    builder.addCase(getProtocolItem.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 기능 등록
     */
    builder.addCase(postProtocolItem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postProtocolItem.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(postProtocolItem.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 기능 수정
     */
    builder.addCase(putProtocolItem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(putProtocolItem.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(putProtocolItem.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 기능 삭제
     */
    builder.addCase(deleteProtocolItem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProtocolItem.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deleteProtocolItem.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 Value 목록 조회
     */
    builder.addCase(getProtocolValueList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProtocolValueList.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      if (response && response.length > 0) {
        state.treeDataList.forEach((treeItem) => {
          if (
            response.find((node) => node.itemSeq.toString() === treeItem.id) !==
              undefined &&
            treeItem.children.length < 2
          ) {
            treeItem.children = response
              .filter((node) => node.itemSeq.toString() === treeItem.id)
              .map((row) => makeTreeNodeChildren(treeItem.id, row));
          }
        });
      }

      state.loading = false;
      state.error = false;
    });
    builder.addCase(getProtocolValueList.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 Value 중복체크
     */
    builder.addCase(getProtocolValueDuplicateCheck.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      getProtocolValueDuplicateCheck.fulfilled,
      (state, action) => {
        const response = action.payload.data.content;
        state.isDuplicated = response;

        state.loading = false;
        state.error = false;
      },
    );
    builder.addCase(
      getProtocolValueDuplicateCheck.rejected,
      (state, action) => {
        state.loading = false;
        state.error = true;
      },
    );
    /**
     * 프로토콜 Value 조회
     */
    builder.addCase(getProtocolValue.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProtocolValue.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      state.protocolValue = { ...state.protocolValue, ...response };
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getProtocolValue.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 Value 등록
     */
    builder.addCase(postProtocolValue.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postProtocolValue.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(postProtocolValue.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 Value 수정
     */
    builder.addCase(putProtocolValue.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(putProtocolValue.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(putProtocolValue.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 프로토콜 Value 삭제
     */
    builder.addCase(deleteProtocolValue.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProtocolValue.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deleteProtocolValue.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const {
  setProtocolFuncParams,
  setConditionSelctList,
  setDataGridTitle,
  setIsDuplicated,
  setOpenDialog,
  setDialogInfo,
  setColumnVisibilityModel,
  setProtocolItem,
  setProtocolValue,
} = protocolFunc.actions;
export default protocolFunc.reducer;
