import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CDataGrid from 'components/complex/Table/CDataGrid';
import {
  postProtocolItemList,
  setProtocolItemParams,
  setDataGridTitle,
  setColumnVisibilityModel,
} from 'redux/reducers/iotProtocol/protocolFunc';
import { protocolFuncAPI } from 'api';
import { fileDownload, isNull } from 'common/utils';

const ProtocolFuncGrid = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { defaultProtocolItemParams } = props;

  const columnVisibilityModel = useSelector(
    (state) => state.protocolFunc.columnVisibilityModel,
    shallowEqual,
  );

  const dataGridColums = useSelector(
    (state) => state.protocolFunc.dataGridColums,
    shallowEqual,
  );

  const protocolItemParams = useSelector(
    (state) => state.protocolFunc.protocolItemParams,
    shallowEqual,
  );

  const loading = useSelector(
    (state) => state.protocolFunc.loading,
    shallowEqual,
  );

  const dataGridTitle = useSelector(
    (state) => state.protocolFunc.dataGridTitle,
    shallowEqual,
  );

  const protocolItemList = useSelector(
    (state) => state.protocolFunc.protocolItemList,
    shallowEqual,
  );

  const totalElements = useSelector(
    (state) => state.protocolFunc.totalElements,
    shallowEqual,
  );

  const handleExportButtonClick = async () => {
    const exportParams = {
      ...protocolItemParams,
      columns: Object.entries(columnVisibilityModel)
        .filter((col) => col[1])
        .map((col) => col[0]),
    };
    const result = await protocolFuncAPI.postProtocolApiExport(exportParams);
    fileDownload(result);
  };

  const handleColumnVisibilityModelChange = async (newModel) => {
    await dispatch(setColumnVisibilityModel(newModel));
  };

  const fetchProtocolItemParams = useCallback(
    async (params) => {
      await dispatch(setProtocolItemParams(params));
    },
    [dispatch],
  );

  const fetchProtocolItemData = useCallback(async () => {
    await dispatch(postProtocolItemList(protocolItemParams));
  }, [dispatch, protocolItemParams]);

  const fetchDataGridTitle = useCallback(
    async (title) => {
      await dispatch(setDataGridTitle(title));
    },
    [dispatch],
  );

  useEffect(() => {
    if (!isNull(protocolItemParams.prodTypeCode)) {
      fetchProtocolItemData();
    }
  }, [fetchProtocolItemData, protocolItemParams]);

  useEffect(() => {
    fetchProtocolItemParams(defaultProtocolItemParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CDataGrid
        height={457}
        title={dataGridTitle}
        columns={dataGridColums}
        rows={protocolItemList}
        totalElement={totalElements}
        isLoading={loading}
        pagination
        page={protocolItemParams.page}
        pageSize={protocolItemParams.pageSize}
        rowsPerPage={protocolItemParams.rowPerPage}
        onPageSizeChange={(newPageSize) =>
          fetchProtocolItemParams({ pageSize: newPageSize })
        }
        onPageChange={(newPages) => fetchProtocolItemParams({ page: newPages })}
        exportButton={true}
        onExportButtonClick={handleExportButtonClick}
        columnsButton={true}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          handleColumnVisibilityModelChange(newModel)
        }
      />
    </>
  );
};

export default ProtocolFuncGrid;
