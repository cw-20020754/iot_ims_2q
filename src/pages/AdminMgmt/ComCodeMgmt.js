import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconButton, Box } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import CButton from 'components/basic/CButton';
import CTree from 'components/basic/CTree';
import CDataGrid from 'components/complex/Table/CDataGrid';
import ComCodeDialog from './CustomDialogs/ComCodeDialog';

const ComCodeMgmt = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  /**
   * Dialog variables
   */
  const [openComCodeDialog, setOpenComCodeDialog] = useState(false);
  const [comCodeDialogInfo, setComCodeDialogInfo] = useState({
    type: '',
    params: {},
  });

  const comCodeDialogOpen = (values) => {
    setComCodeDialogInfo({ ...comCodeDialogInfo, ...values });
    setOpenComCodeDialog(true);
  };

  const comCodeDialogClose = () => {
    setOpenComCodeDialog(false);
  };

  /**
   * Grid variables
   */
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 25,
    rowPerPage: [25, 50, 100],
  });
  const [dataGridTitle, setDataGridTitle] = useState(
    t('word.com') + t('word.code'),
  );

  const dataGridColums = useSelector(
    (state) => state.comCodeMgmt.dataGridColums,
    shallowEqual,
  );
  const dataGridRows = useSelector(
    (state) => state.comCodeMgmt.dataGridRows,
    shallowEqual,
  );

  const onTitleButtonClick = () => {
    comCodeDialogOpen({ type: 'addCode' });
  };

  const dataGridTitleButtons = [
    {
      id: 'codeAddButton',
      text: t('word.code') + ' ' + t('word.add'),
      onTitleButtonClick: onTitleButtonClick,
    },
  ];

  /**
   * Tree Variables
   */
  const onNodeSelect = (event, nodeIds) => {
    // console.log(nodeIds);
  };

  const onNodeButtonClick = (type, id) => {
    // console.log('type = ', type);
    // console.log('id = ', id);
  };

  const treeDataList = [
    {
      id: '001',
      labelText: '그룹1',
      labelInfo: 2,
      prependIcon: GridViewIcon,
      appendIconButtons: [
        {
          type: 'edit',
          icon: EditIcon,
          onNodeButtonClick: onNodeButtonClick,
        },
        {
          type: 'delete',
          icon: DeleteIcon,
          onNodeButtonClick: onNodeButtonClick,
          disabled: true,
        },
      ],
      children: [
        {
          id: '001.1',
          labelText: 'item1',
          labelInfo: 'ko',
          prependIcon: ArticleIcon,
        },
        {
          id: '001.2',
          labelText: 'item2',
          labelInfo: 'ko',
          prependIcon: ArticleIcon,
        },
      ],
    },
    {
      id: '002',
      labelText: '그룹2',
      labelInfo: 0,
      prependIcon: GridViewIcon,
      appendIconButtons: [
        {
          type: 'edit',
          icon: EditIcon,
          onNodeButtonClick: onNodeButtonClick,
        },
        {
          type: 'delete',
          icon: DeleteIcon,
          onNodeButtonClick: onNodeButtonClick,
        },
      ],
    },
  ];

  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
      <Box gridColumn="span 3">
        <CTree
          treeDataList={treeDataList}
          onNodeSelect={onNodeSelect}
          // defaultExpanded={[treeDataList[0].id]}
          headerChildren={
            <>
              <IconButton>
                <AutorenewIcon />
              </IconButton>
              <CButton onClick={() => comCodeDialogOpen({ type: 'addGroup' })}>
                {t('word.group') + ' ' + t('word.add')}
              </CButton>
            </>
          }
        ></CTree>
      </Box>
      <Box gridColumn="span 9">
        <CDataGrid
          title={dataGridTitle}
          titleButtons={dataGridTitleButtons}
          columns={dataGridColums}
          rows={dataGridRows}
          // totalElement={firmwareMng.totalElements}
          pageSize={pageInfo.size}
          rowsPerPage={pageInfo.rowPerPage}
          // onRefresh={onRefresh}
          // isLoading={isLoading}
          // onPageSizeChange={(newPageSize) => {
          //   onFetchData({
          //     page: param.page,
          //     size: newPageSize,
          //   });
          // }}
          // onPageChange={(newPages) => {
          //   onFetchData({
          //     page: newPages,
          //     size: param.size,
          //   });
          // }}
          // toolbarBtnList={toolbarBtnList}
        />
      </Box>
      <ComCodeDialog
        open={openComCodeDialog}
        info={comCodeDialogInfo}
        onClose={comCodeDialogClose}
      ></ComCodeDialog>
    </Box>
  );
};

export default ComCodeMgmt;
