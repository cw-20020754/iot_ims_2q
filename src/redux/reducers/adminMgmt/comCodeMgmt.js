import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isNull } from 'common/utils';
import i18n from 'common/locale/i18n';
import CGridActionsCellItem from 'components/complex/Table/CGridActionsCellItem';

const name = 'comCode';

const initialState = {
  treeDataList: [],
  dataGridColums: [
    {
      field: 'actions',
      type: 'actions',
      align: 'center',
      getActions: (params) => [
        CGridActionsCellItem('edit', params.id),
        CGridActionsCellItem('delete', params.id),
      ],
    },
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

const comCodeMgmt = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {},
});

export default comCodeMgmt.reducer;
