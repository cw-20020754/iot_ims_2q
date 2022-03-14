import { createSlice } from '@reduxjs/toolkit';
import i18n from 'common/locale/i18n';
import { comCodeAPI } from 'api';
import GridViewIcon from '@mui/icons-material/GridView';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const name = 'comCode';

const initialState = {
  comCodeGroupList: [],
  onNodeButtonClickFunc: () => {},
  treeDataList: [],
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
  dataGridRows: [{ id: 1, groupId: '001' }],
  loading: false,
  error: false,
};

/**
 * 공통코드 그룹 조회
 */
export const getComCodeGroup = createAsyncThunk(
  `${name}/getComCodeGroup`,
  async (thunkAPI) => {
    const response = await comCodeAPI.getComCodeGroup();
    return response.data;
  },
);

const comCodeMgmt = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * 공통코드 그룹 조회
     */
    builder.addCase(getComCodeGroup.fulfilled, (state, action) => {
      state.comCodeGroupList = [];
      if (action && Array.isArray(action)) {
        action.forEach((node) => {
          state.comCodeGroupList.push({
            id: node.groupId,
            labelText: node.groupNm,
            labelInfo: node.cnt,
            prependIcon: GridViewIcon,
            appendIconButtons: [
              {
                type: 'edit',
                icon: EditIcon,
                onNodeButtonClick: state.onNodeButtonClickFunc,
              },
              {
                type: 'delete',
                icon: DeleteIcon,
                onNodeButtonClick: state.onNodeButtonClickFunc,
                disabled: node.cnt === 0 ? false : true,
              },
            ],
            children: [],
          });
        });
      }

      state.loading = false;
      state.error = false;
    });
    builder.addCase(getComCodeGroup.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = true;
    });
  },
});

export default comCodeMgmt.reducer;
