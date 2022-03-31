import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
    groupId: '001',
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
    },
    {
      field: 'groupNm',
      headerName: i18n.t('word.group') + ' ' + i18n.t('word.nm'),
      headerAlign: 'center',
    },
    {
      field: 'code',
      headerName: i18n.t('word.code') + ' ' + i18n.t('word.id'),
      headerAlign: 'center',
    },
    {
      field: 'codeNm',
      headerName: i18n.t('word.code') + ' ' + i18n.t('word.nm'),
      headerAlign: 'center',
    },
    {
      field: 'langCode',
      headerName: i18n.t('word.lang') + ' ' + i18n.t('word.code'),
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
  isComCodeDuplicated: false,
  loading: false,
  error: false,
};

const makeTreeNodeChildren = (groupId, child) => {
  return {
    id: groupId + '.' + child.code,
    labelText: child.codeNm,
    prependIcon: ArticleIcon,
  };
};

/**
 * 공통코드 조회 (그룹 목록 기준)
 */
export const postComCodeList = createAsyncThunk(
  `${name}/postComCodeList`,
  async (body, thunkAPI) => {
    return await comCodeAPI.postComCodeList(body);
  },
);

/**
 * 공통코드 조회 (그룹 목록 기준) - tree구성용
 */
export const postComCodeListForTree = createAsyncThunk(
  `${name}/postComCodeListForTree`,
  async (body, thunkAPI) => {
    return await comCodeAPI.postComCodeList(body);
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
 * 공통코드 그룹 등록
 */
export const postComCodeGroup = createAsyncThunk(
  `${name}/postComCodeGroup`,
  async (body, thunkAPI) => {
    return await comCodeAPI.postComCodeGroup(body);
  },
);

/**
 * 공통코드 그룹 수정
 */
export const putComCodeGroup = createAsyncThunk(
  `${name}/putComCodeGroup`,
  async (body, thunkAPI) => {
    return await comCodeAPI.putComCodeGroup(body);
  },
);

/**
 * 공통코드 그룹 삭제
 */
export const deleteComCodeGroup = createAsyncThunk(
  `${name}/deleteComCodeGroup`,
  async (params, thunkAPI) => {
    return await comCodeAPI.deleteComCodeGroup(params);
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

/**
 * 공통코드 중복체크
 */
export const getComCodeDuplicateCheck = createAsyncThunk(
  `${name}/getComCodeDuplicateCheck`,
  async (params, thunkAPI) => {
    return await comCodeAPI.getComCodeDuplicateCheck(params);
  },
);

/**
 * 공통코드 등록
 */
export const postComCode = createAsyncThunk(
  `${name}/postComCode`,
  async (body, thunkAPI) => {
    return await comCodeAPI.postComCode(body);
  },
);

/**
 * 공통코드 수정
 */
export const putComCode = createAsyncThunk(
  `${name}/putComCode`,
  async (body, thunkAPI) => {
    return await comCodeAPI.putComCode(body);
  },
);

/**
 * 공통코드 삭제
 */
export const deleteComCode = createAsyncThunk(
  `${name}/deleteComCode`,
  async (params, thunkAPI) => {
    return await comCodeAPI.deleteComCode(params);
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
    setIsComCodeDuplicated(state, action) {
      state.isComCodeDuplicated = action.payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * 공통코드 조회 (공용, 셀렉터 용)
     */
    builder.addCase(postComCodeList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postComCodeList.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      if (response && Array.isArray(response)) {
        response.forEach((node) => {
          if (
            !state.sharedComComList.some(
              (item) => item.groupId === node.groupId,
            )
          ) {
            const group = {
              groupId: node.groupId,
              codeList: [],
            };
            node.codeList?.forEach((code) => {
              group.codeList.push({
                value: code.code,
                text: code.codeNm,
              });
            });
            state.sharedComComList.push(group);
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
     * 공통코드 조회 (그룹 목록 기준) - tree용
     */
    builder.addCase(postComCodeListForTree.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postComCodeListForTree.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      if (response && Array.isArray(response)) {
        response.forEach((node) => {
          state.treeDataList.forEach((treeItem) => {
            if (treeItem.id === node.groupId && treeItem.children.length < 2) {
              treeItem.children = node.codeList.map((row) =>
                makeTreeNodeChildren(node.groupId, row),
              );
            }
          });
        });
      }

      state.loading = false;
      state.error = false;
    });
    builder.addCase(postComCodeListForTree.rejected, (state, action) => {
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
            nodeId: node.groupId,
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
            children: node.cnt > 0 ? [{}] : [],
          });
        });
      }

      state.comCodeParams = {
        ...state.comCodeParams,
        groupId: state.treeDataList.length > 0 && state.treeDataList[0].id,
        groupNm:
          state.treeDataList.length > 0 && state.treeDataList[0].labelText,
      };

      state.loading = false;
      state.error = false;
    });
    builder.addCase(getComCodeGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 공통코드 그룹 등록
     */
    builder.addCase(postComCodeGroup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postComCodeGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(postComCodeGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 공통코드 그룹 수정
     */
    builder.addCase(putComCodeGroup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(putComCodeGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(putComCodeGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 공통코드 그룹 삭제
     */
    builder.addCase(deleteComCodeGroup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteComCodeGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deleteComCodeGroup.rejected, (state, action) => {
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

      state.comCodeTotalElements = pageInfo.totalRecord;

      state.loading = false;
      state.error = false;
    });
    builder.addCase(getComCode.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 공통코드 중복체크
     */
    builder.addCase(getComCodeDuplicateCheck.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getComCodeDuplicateCheck.fulfilled, (state, action) => {
      const response = action.payload.data.content;
      state.isComCodeDuplicated = response;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getComCodeDuplicateCheck.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 공통코드 등록
     */
    builder.addCase(postComCode.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postComCode.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(postComCode.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 공통코드 수정
     */
    builder.addCase(putComCode.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(putComCode.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(putComCode.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /**
     * 공통코드 삭제
     */
    builder.addCase(deleteComCode.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteComCode.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deleteComCode.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setComCodeParams, setIsComCodeDuplicated } = comCodeMgmt.actions;
export default comCodeMgmt.reducer;
