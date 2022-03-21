import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGridStringOperators } from '@mui/x-data-grid-pro';
import i18n from 'common/locale/i18n';
import { comCodeAPI } from 'api';
import GridViewIcon from '@mui/icons-material/GridView';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';

const name = 'comCode';

const initialState = {
  // 공통코드 조회 (그룹 목록 기준) by postComCodeList
  sharedComComList: [],
  // 공통코드 목록 조회 by getComCode
  comCodeList: [],
  comCodeParams: {
    groupId: '',
    code: '',
    codeNm: '',
    page: 0,
    pageSize: 5,
    rowPerPage: [5, 10, 25],
  },
  comCodeTotalElements: 0,
  treeDataList: [],
  dataGridTitle: i18n.t('word.com') + i18n.t('word.code'),
  dataGridColums: [
    {
      field: 'groupId',
      headerName: i18n.t('word.group') + ' ' + i18n.t('word.id'),
      headerAlign: 'center',
      filterable: false,
    },
    {
      field: 'groupNm',
      headerName: i18n.t('word.group') + ' ' + i18n.t('word.nm'),
      headerAlign: 'center',
      filterable: false,
    },
    {
      field: 'code',
      headerName: i18n.t('word.code') + ' ' + i18n.t('word.id'),
      headerAlign: 'center',
      filterOperators: getGridStringOperators().filter(
        (operatoer) => operatoer.value === 'contains',
      ),
    },
    {
      field: 'codeNm',
      headerName: i18n.t('word.code') + ' ' + i18n.t('word.nm'),
      headerAlign: 'center',
      filterOperators: getGridStringOperators().filter(
        (operatoer) => operatoer.value === 'contains',
      ),
    },
    {
      field: 'langCode',
      headerName: i18n.t('word.lang') + ' ' + i18n.t('word.code'),
      headerAlign: 'center',
      filterable: false,
    },
    {
      field: 'mdfId',
      headerName: i18n.t('word.mdf') + i18n.t('word.char'),
      headerAlign: 'center',
      filterable: false,
    },
    {
      field: 'mdfDate',
      headerName: i18n.t('word.mdf') + i18n.t('word.datm'),
      headerAlign: 'center',
      filterable: false,
    },
  ],
  loading: false,
  error: false,
};

const makeTreeNodeChildren = (child) => {
  return {
    id: child.groupId + '.' + child.code,
    labelText: child.codeNm,
    labelInfo: child.langCode,
    prependIcon: ArticleIcon,
  };
};

/**
 * 공통코드 조회 (그룹 목록 기준)
 */
export const postComCodeList = createAsyncThunk(
  `${name}/postComCodeList`,
  async (groupIds, thunkAPI) => {
    return await comCodeAPI.postComCodeList(groupIds);
  },
);

/**
 * 공통코드 그룹 조회
 */
export const getComCodeGroup = createAsyncThunk(
  `${name}/getComCodeGroup`,
  async (thunkAPI) => {
    return await comCodeAPI.getComCodeGroup();
  },
);

/**
 * 공통코드 목록 조회
 */
export const getComCode = createAsyncThunk(
  `${name}/getComCode`,
  async (params, thunkAPI) => {
    return await comCodeAPI.getComCode(params);
  },
);

const comCodeMgmt = createSlice({
  name,
  initialState,
  reducers: {
    setComCodeParams(state, action) {
      const obj = action.payload;
      state.comCodeParams = { ...state.comCodeParams, ...obj };
    },
  },
  extraReducers: (builder) => {
    /**
     * 공통코드 조회 (그룹 목록 기준)
     */
    builder.addCase(postComCodeList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postComCodeList.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      if (response && Array.isArray(response)) {
        response.forEach((node) => {
          if (!state.sharedComComList.includes(node)) {
            state.sharedComComList.push(node);
          }
        });
      }

      state.loading = false;
      state.error = false;
    });
    builder.addCase(postComCodeList.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 공통코드 그룹 조회
     */
    builder.addCase(getComCodeGroup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getComCodeGroup.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      state.treeDataList = [];
      if (response && Array.isArray(response)) {
        response.forEach((node) => {
          state.treeDataList.push({
            id: node.groupId,
            labelText: node.groupNm,
            labelInfo: node.cnt,
            prependIcon: GridViewIcon,
            appendIconButtons: [
              {
                type: 'edit',
                icon: EditIcon,
              },
              {
                type: 'delete',
                icon: DeleteIcon,
                disabled: node.cnt === 0 ? false : true,
              },
            ],
            children: [{}],
          });
        });
      }

      state.comCodeParams.groupId =
        state.treeDataList.length > 0 && state.treeDataList[0].id;

      state.loading = false;
      state.error = false;
    });
    builder.addCase(getComCodeGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 공통코드 목록 조회
     */
    builder.addCase(getComCode.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getComCode.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      const pageInfo = action.payload.data.pageInfo;
      state.comCodeList = [];

      response.forEach((row, index) => {
        state.comCodeList.push({ ...row, id: index });
      });

      // state.treeDataList.forEach((node) => {
      //   node.children = response
      //     .filter((row) => row.groupId === node.id)
      //     .map((row) => makeTreeNodeChildren(row));
      // });

      state.comCodeTotalElements = pageInfo.totalRecord;

      state.loading = false;
      state.error = false;
    });
    builder.addCase(getComCode.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setComCodeParams } = comCodeMgmt.actions;
export default comCodeMgmt.reducer;
