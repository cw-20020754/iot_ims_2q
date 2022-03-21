import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconButton, Box } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CGridActionsCellItem from 'components/complex/Table/CGridActionsCellItem';
import CButton from 'components/basic/CButton';
import CTree from 'components/basic/CTree';
import CSearchCondition from 'components/complex/CSearchCondition';
import CDataGrid from 'components/complex/Table/CDataGrid';
import ComCodeDialog from './CustomDialogs/ComCodeDialog';
import {
  getComCodeGroup,
  getComCode,
  setComCodeParams,
} from 'redux/reducers/adminMgmt/comCodeMgmt';

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
  const onGridButtonClick = (type, id) => {
    comCodeDialogOpen({ type: type === 'edit' ? 'mdfCode' : 'delCode' });
  };

  const dataGridColums = [
    {
      field: 'actions',
      type: 'actions',
      align: 'center',
      getActions: (params) => [
        CGridActionsCellItem({
          type: 'edit',
          id: params.id,
          onClick: onGridButtonClick,
        }),
        CGridActionsCellItem({
          type: 'delete',
          id: params.id,
          onClick: onGridButtonClick,
        }),
      ],
    },
  ].concat(
    useSelector((state) => state.comCodeMgmt.dataGridColums, shallowEqual),
  );
  const comCodeParams = useSelector(
    (state) => state.comCodeMgmt.comCodeParams,
    shallowEqual,
  );
  const comCodeTotalElements = useSelector(
    (state) => state.comCodeMgmt.comCodeTotalElements,
  );
  const loading = useSelector((state) => state.comCodeMgmt.loading);
  const dataGridTitle = useSelector((state) => state.comCodeMgmt.dataGridTitle);
  const comCodeList = useSelector(
    (state) => state.comCodeMgmt.comCodeList,
    shallowEqual,
  );

  const [filterModel, setFilterModel] = useState({
    items: [
      {
        id: 1,
        columnField: 'code',
        operatorValue: 'contains',
        value: '',
      },
      {
        id: 2,
        columnField: 'codeNm',
        operatorValue: 'contains',
        value: '',
      },
    ],
  });

  const onFilterChange = useCallback(
    (newFilterModel) => {
      setFilterModel(newFilterModel);
      dispatch(
        setComCodeParams({
          page: 0,
          code: newFilterModel.items.find((item) => item.columnField === 'code')
            .value,
          codeNm: newFilterModel.items.find(
            (item) => item.columnField === 'codeNm',
          ).value,
        }),
      );
    },
    [dispatch],
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
  const treeDataList = useSelector(
    (state) => state.comCodeMgmt.treeDataList,
    shallowEqual,
  );

  const onNodeSelect = (event, nodeIds) => {
    dispatch(setComCodeParams({ page: 0, groupId: nodeIds }));
  };

  const onNodeButtonClick = (type, id) => {
    comCodeDialogOpen({
      type: type === 'edit' ? 'mdfGroup' : 'delGroup',
      params: { id: id },
    });
  };

  /**
   * Data fetch
   */
  const onFetchComCodeGroupData = useCallback(async () => {
    dispatch(getComCodeGroup());
  }, [dispatch]);

  useEffect(() => {
    onFetchComCodeGroupData();
  }, [onFetchComCodeGroupData]);

  const onFetchComCodeData = useCallback(async () => {
    dispatch(getComCode(comCodeParams));
  }, [dispatch, comCodeParams]);

  useEffect(() => {
    onFetchComCodeData();
  }, [onFetchComCodeData]);

  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
      <Box gridColumn="span 3">
        <CTree
          treeDataList={treeDataList}
          onNodeSelect={onNodeSelect}
          onNodeButtonClick={onNodeButtonClick}
          headerChildren={
            <>
              <IconButton onClick={() => onFetchComCodeGroupData()}>
                <AutorenewIcon />
              </IconButton>
              <CButton onClick={() => comCodeDialogOpen({ type: 'addGroup' })}>
                {t('word.group') + ' ' + t('word.add')}
              </CButton>
            </>
          }
        ></CTree>
      </Box>
      <Box gridColumn="span 9" sx={{ flexGrow: 1 }}>
        {/* <CSearchCondition
          onFetchData={onFetchComCodeData}
          conditionList={conditionList}
        /> */}
        <CDataGrid
          height={505}
          title={dataGridTitle}
          titleButtons={dataGridTitleButtons}
          columns={dataGridColums}
          rows={comCodeList}
          totalElement={comCodeTotalElements}
          filterModel={filterModel}
          onFilterChange={onFilterChange}
          componentsProps={{
            filterPanel: { linkOperators: ['and'], deleteFilter: undefined },
          }}
          isLoading={loading}
          pagination
          page={comCodeParams.page}
          pageSize={comCodeParams.pageSize}
          rowsPerPage={comCodeParams.rowPerPage}
          onPageSizeChange={(newPageSize) =>
            dispatch(setComCodeParams({ pageSize: newPageSize }))
          }
          onPageChange={(newPages) =>
            dispatch(setComCodeParams({ page: newPages }))
          }
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

export default React.memo(ComCodeMgmt);
