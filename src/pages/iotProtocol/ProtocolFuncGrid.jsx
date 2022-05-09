import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CDataGrid from 'components/complex/Table/CDataGrid';
import {
  postProtocolFuncList,
  setProtocolFuncParams,
  setDataGridTitle,
  setColumnVisibilityModel,
} from '@/redux/reducers/iotProtocol/protocolFunc';
import { protocolFuncAPI } from 'api';
import { fileDownload, isNull } from 'common/utils';

const ProtocolFuncGrid = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { defaultProtocolFuncParams } = props;

  const columnVisibilityModel = useSelector(
    (state) => state.protocolFunc.columnVisibilityModel,
    shallowEqual,
  );

  const dataGridColums = useSelector(
    (state) => state.protocolFunc.dataGridColums,
    shallowEqual,
  );

  const protocolFuncParams = useSelector(
    (state) => state.protocolFunc.protocolFuncParams,
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

  const protocolFuncList = useSelector(
    (state) => state.protocolFunc.protocolFuncList,
    shallowEqual,
  );

  const totalElements = useSelector(
    (state) => state.protocolFunc.totalElements,
    shallowEqual,
  );

  const handleExportButtonClick = async () => {
    const exportParams = {
      ...protocolFuncParams,
      columns: Object.entries(columnVisibilityModel)
        .filter((col) => col[1])
        .map((col) => col[0]),
    };
    const result = await protocolFuncAPI.postProtocolFuncExport(exportParams);
    fileDownload(result);
  };

  const handleColumnVisibilityModelChange = async (newModel) => {
    await dispatch(setColumnVisibilityModel(newModel));
  };

  const fetchProtocolFuncParams = useCallback(
    async (params) => {
      await dispatch(setProtocolFuncParams(params));
    },
    [dispatch],
  );

  const fetchProtocolFuncData = useCallback(async () => {
    await dispatch(postProtocolFuncList(protocolFuncParams));
  }, [dispatch, protocolFuncParams]);

  const fetchDataGridTitle = useCallback(
    async (title) => {
      await dispatch(setDataGridTitle(title));
    },
    [dispatch],
  );

  useEffect(() => {
    if (!isNull(protocolFuncParams.prodTypeCode)) {
      fetchProtocolFuncData();
    }
  }, [fetchProtocolFuncData, protocolFuncParams]);

  useEffect(() => {
    fetchProtocolFuncParams(defaultProtocolFuncParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CDataGrid
        height={457}
        title={dataGridTitle}
        columns={dataGridColums}
        rows={protocolFuncList}
        totalElement={totalElements}
        isLoading={loading}
        pagination
        page={protocolFuncParams.page}
        pageSize={protocolFuncParams.pageSize}
        rowsPerPage={protocolFuncParams.rowPerPage}
        onPageSizeChange={(newPageSize) =>
          fetchProtocolFuncParams({ pageSize: newPageSize })
        }
        onPageChange={(newPages) => fetchProtocolFuncParams({ page: newPages })}
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
