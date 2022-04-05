import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CGridActionsCellItem from 'components/complex/Table/CGridActionsCellItem';
import CSearchCondition from 'components/complex/CSearchCondition';
import CDataGrid from 'components/complex/Table/CDataGrid';
import {
  getComCode,
  setComCodeParams,
} from 'redux/reducers/adminMgmt/comCodeMgmt';
import { comCodeAPI } from 'api';
import { fileDownload, isNull } from 'common/utils';

const ComCodeMgmtGrid = (props) => {
  const { onComCodeDialogOpen } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const conditionList = [
    {
      id: 'codeId',
      category: 'codeId',
      label: t('word.code') + ' ' + t('word.id'),
      type: 'textBox',
      value: '',
      size: {
        xs: 6,
      },
    },
    {
      id: 'codeNm',
      category: 'codeNm',
      label: t('word.code') + ' ' + t('word.nm'),
      type: 'textBox',
      value: '',
      size: {
        xs: 6,
      },
    },
  ];

  const handleClickSearch = async (searchCondition) => {
    if (searchCondition) {
      fetchComCodeParams({
        page: 0,
        code: searchCondition['codeId'] || '',
        codeNm: searchCondition['codeNm'] || '',
      });
    }
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
          onClick: () =>
            onComCodeDialogOpen({
              type: 'mdfCode',
              params: {
                groupId: params.row.groupId,
                code: params.row.code,
                codeNm: params.row.codeNm,
                langCode: params.row.langCode,
              },
            }),
        }),
        CGridActionsCellItem({
          type: 'delete',
          id: params.id,
          onClick: () => {
            onComCodeDialogOpen({
              type: 'delCode',
              params: {
                groupId: params.row.groupId,
                code: params.row.code,
                langCode: params.row.langCode,
              },
            });
          },
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
    shallowEqual,
  );
  const loading = useSelector(
    (state) => state.comCodeMgmt.loading,
    shallowEqual,
  );
  const dataGridTitle = useSelector(
    (state) => state.comCodeMgmt.dataGridTitle,
    shallowEqual,
  );
  const comCodeList = useSelector(
    (state) => state.comCodeMgmt.comCodeList,
    shallowEqual,
  );

  const dataGridTitleButtons = [
    {
      id: 'codeAddButton',
      text: t('word.code') + ' ' + t('word.add'),
      onTitleButtonClick: () =>
        onComCodeDialogOpen({
          type: 'addCode',
          params: {
            groupId: comCodeParams.groupId,
            groupNm: comCodeParams.groupNm,
            code: '',
            codeNm: '',
            langCode: 'ko',
          },
        }),
    },
  ];

  const handleExportButtonClick = async () => {
    const result = await comCodeAPI.getComCodeExport(comCodeParams);
    fileDownload(result);
  };

  const fetchComCodeParams = useCallback(
    async (params) => {
      await dispatch(setComCodeParams(params));
    },
    [dispatch],
  );

  const fetchComCodeData = useCallback(async () => {
    await dispatch(getComCode(comCodeParams));
  }, [dispatch, comCodeParams]);

  useEffect(() => {
    if (!isNull(comCodeParams.groupId)) {
      fetchComCodeData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comCodeParams]);

  return (
    <>
      <CSearchCondition
        onClickSearch={handleClickSearch}
        conditionList={conditionList}
      />
      <CDataGrid
        height={457}
        title={dataGridTitle}
        titleButtons={dataGridTitleButtons}
        columns={dataGridColums}
        rows={comCodeList}
        totalElement={comCodeTotalElements}
        isLoading={loading}
        pagination
        page={comCodeParams.page}
        pageSize={comCodeParams.pageSize}
        rowsPerPage={comCodeParams.rowPerPage}
        onPageSizeChange={(newPageSize) =>
          fetchComCodeParams({ pageSize: newPageSize })
        }
        onPageChange={(newPages) => fetchComCodeParams({ page: newPages })}
        exportButton={true}
        onExportButtonClick={handleExportButtonClick}
      />
    </>
  );
};

export default ComCodeMgmtGrid;
