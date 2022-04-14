import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CGridActionsCellItem from 'components/complex/Table/CGridActionsCellItem';
import CSearchCondition from 'components/complex/CSearchCondition';
import CDataGrid from 'components/complex/Table/CDataGrid';
import ProtocolApiDialog from './CustomDIalogs/ProtocolApiDialog';
import { postComCodeList } from 'redux/reducers/adminMgmt/comCodeMgmt';
import {
  getProtocolApi,
  setProtocolApiParams,
  setConditionSelctList,
  setDataGridTitle,
  setOpenDialog,
  setDialogInfo,
  setColumnVisibilityModel,
} from 'redux/reducers/iotProtocol/protocolApi';
import { protocolAPI } from 'api';
import { fileDownload, isNull } from 'common/utils';

const ProtocolApi = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const protocolTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '002',
      )[0]?.codeList,
    shallowEqual,
  );

  const prodTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '004',
      )[0]?.codeList,
    shallowEqual,
  );

  const openDialog = useSelector(
    (state) => state.protocolApi.openDialog,
    shallowEqual,
  );

  const dialogInfo = useSelector(
    (state) => state.protocolApi.dialogInfo,
    shallowEqual,
  );

  const conditionList = useSelector(
    (state) => state.protocolApi.conditionList,
    shallowEqual,
  );

  const columnVisibilityModel = useSelector(
    (state) => state.protocolApi.columnVisibilityModel,
    shallowEqual,
  );

  const dataGridColums = [
    {
      field: 'actions',
      type: 'actions',
      align: 'center',
      hideable: false,
      getActions: (params) => [
        CGridActionsCellItem({
          type: 'edit',
          id: params.id,
          onClick: () =>
            handleDialogOpen({
              type: 'mdfApi',
              params: {
                apiSeq: params.row.apiSeq,
                prodTypeCode: params.row.prodTypeCode,
                typeCode: params.row.typeCode,
                groupCode: params.row.groupCode,
                apiId: params.row.apiId,
                apiCode: params.row.apiCode,
                apiDirectionCode: params.row.apiDirectionCode,
                apiDesc: params.row.apiDesc,
              },
            }),
        }),
        CGridActionsCellItem({
          type: 'delete',
          id: params.id,
          onClick: () => {
            handleDialogOpen({
              type: 'delApi',
              params: {
                apiSeq: params.row.apiSeq,
              },
            });
          },
        }),
      ],
    },
  ].concat(
    useSelector((state) => state.protocolApi.dataGridColums, shallowEqual),
  );

  // 정수기, MQTT Only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultProtocolApiParams = {
    prodTypeCode: '02',
    typeCode: '0003',
  };

  const protocolApiParams = useSelector(
    (state) => state.protocolApi.protocolApiParams,
    shallowEqual,
  );

  const loading = useSelector(
    (state) => state.protocolApi.loading,
    shallowEqual,
  );

  const dataGridTitle = useSelector(
    (state) => state.protocolApi.dataGridTitle,
    shallowEqual,
  );

  const protocolApiList = useSelector(
    (state) => state.protocolApi.protocolApiList,
    shallowEqual,
  );

  const dataGridTitleButtons = [
    {
      id: 'apiAddButton',
      text: t('word.api') + ' ' + t('word.add'),
      onTitleButtonClick: () =>
        handleDialogOpen({
          type: 'addApi',
          params: {
            prodTypeCode: protocolApiParams.prodTypeCode,
            typeCode: protocolApiParams.typeCode,
            apiId: '',
            groupCode: '',
            apiCode: '',
            apiDirectionCode: '',
            apiDesc: '',
          },
        }),
    },
  ];

  const handleClickSearch = async (searchConditionParams) => {
    if (searchConditionParams) {
      fetchProtocolApiParams({
        prodTypeCode: searchConditionParams['prodTypeCode'] || '',
        typeCode: searchConditionParams['typeCode'] || '',
      });
      const prodTypeCodeNm = prodTypeList.filter(
        (item) => item.value === searchConditionParams['prodTypeCode'],
      )[0].text;
      const typeCodeNm = protocolTypeList.filter(
        (item) => item.value === searchConditionParams['typeCode'],
      )[0].text;
      fetchDataGridTitle(`${prodTypeCodeNm} / ${typeCodeNm}`);
    }
  };

  const handleDialogOpen = async (values) => {
    await dispatch(setDialogInfo(values));
    await dispatch(setOpenDialog(true));
  };

  const handleDialogClose = async (isSubmit) => {
    if (isSubmit) {
      fetchProtocolApiData();
    }
  };

  const handleExportButtonClick = async () => {
    const exportParams = {
      ...protocolApiParams,
      columns: Object.entries(columnVisibilityModel)
        .filter((col) => col[1])
        .map((col) => col[0]),
    };
    const result = await protocolAPI.postProtocolApiExport(exportParams);
    fileDownload(result);
  };

  const handleColumnVisibilityModelChange = async (newModel) => {
    await dispatch(setColumnVisibilityModel(newModel));
  };

  const fetchProtocolApiParams = useCallback(
    async (params) => {
      await dispatch(setProtocolApiParams(params));
    },
    [dispatch],
  );

  const fetchProtocolApiData = useCallback(async () => {
    await dispatch(getProtocolApi(protocolApiParams));
  }, [dispatch, protocolApiParams]);

  const fetchConditionSelectList = useCallback(async () => {
    await dispatch(setConditionSelctList({ protocolTypeList, prodTypeList }));
  }, [dispatch, protocolTypeList, prodTypeList]);

  const fetchDataGridTitle = useCallback(
    async (title) => {
      await dispatch(setDataGridTitle(title));
    },
    [dispatch],
  );

  /**
   * 002 : 프로토콜 유형
   * 004 : 제품 유형
   */
  const fetchComCodeList = useCallback(async () => {
    await dispatch(postComCodeList({ groupIdList: ['002', '004'] }));
  }, [dispatch]);

  useEffect(() => {
    if (!isNull(protocolApiParams.prodTypeCode)) {
      fetchProtocolApiData();
    }
  }, [fetchProtocolApiData, protocolApiParams]);

  useEffect(() => {
    fetchConditionSelectList();
  }, [fetchConditionSelectList]);

  useEffect(() => {
    if (!protocolTypeList || !prodTypeList) {
      fetchComCodeList();
      fetchProtocolApiParams(defaultProtocolApiParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {protocolTypeList?.length > 0 && (
        <CSearchCondition
          onClickSearch={handleClickSearch}
          conditionList={conditionList}
          defaultValues={defaultProtocolApiParams}
          expanded={true}
        />
      )}
      <CDataGrid
        height={457}
        title={dataGridTitle}
        titleButtons={dataGridTitleButtons}
        columns={dataGridColums}
        rows={protocolApiList}
        isLoading={loading}
        pagination={false}
        exportButton={true}
        onExportButtonClick={handleExportButtonClick}
        columnsButton={true}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          handleColumnVisibilityModelChange(newModel)
        }
      />
      <ProtocolApiDialog onClose={handleDialogClose}></ProtocolApiDialog>
    </>
  );
};

export default ProtocolApi;
