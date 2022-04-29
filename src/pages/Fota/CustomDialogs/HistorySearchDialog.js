import React, { useCallback, useEffect } from 'react';
import CDialog from 'components/basic/CDialog';
import { Divider } from '@mui/material';
import CDialogContent from 'components/basic/CDialogContent';
import { isNull, makeQuery, reformatData } from 'common/utils';
import CDataGrid from 'components/complex/Table/CDataGrid';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  setDialogConditionSelectList,
  setDialogParams,
} from 'redux/reducers/fota/fotaStatus';
import { GROUP_ID } from 'common/constants';
import { postComCodeList } from 'redux/reducers/adminMgmt/comCodeMgmt';
import CSearchCondition from 'components/complex/CSearchCondition';
import { getHistoryList } from 'redux/reducers/fota/fotaStatus';

const HistorySearchDialog = (props) => {
  const { open, onClose, maxWidth, dialogInfo } = props;

  const dispatch = useDispatch();

  const {
    dialogParams,
    dialogDataGridColums,
    dialogConditionList,
    fotaHistory,
    loading,
  } = useSelector((state) => state.fotaStatus, shallowEqual);

  const certStatusList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.CERT_STATUS,
      ),
    shallowEqual,
  )[0]?.codeList;

  const setReformatRowList = (list) => {
    let rows = [];
    if (Array.isArray(list) && list.length > 0) {
      list.forEach((item, index) => {
        rows.push({
          ...item,
          regDate: reformatData('date', item.regDate),
          updDate: reformatData('date', item.updDate),
          originDt: reformatData('date', item.originDt),
          isCertExpired: reformatData('yn', item.isCertExpired),
        });
      });
    }
    return rows;
  };

  const handleClickSearch = async (searchConditionParams) => {
    if (searchConditionParams) {
      fetchDialogParams({ ...searchConditionParams });
    }
  };

  const handleRefreshButtonClick = () => {
    fetchFotaHistroy(dialogParams);
  };

  const fetchComCodeList = useCallback(async () => {
    await dispatch(postComCodeList({ groupIdList: [GROUP_ID.CERT_STATUS] }));
  }, [dispatch]);

  const fetchDialogParams = useCallback(
    async (params) => {
      await dispatch(setDialogParams(params));
    },
    [dispatch],
  );

  const fetchConditionSelectList = useCallback(async () => {
    await dispatch(setDialogConditionSelectList({ certStatusList }));
  }, [dispatch, certStatusList]);

  const fetchFotaHistroy = useCallback(
    async (params) => {
      let param = {
        ...params,
        certShadowStatus: !isNull(params.certStatus)
          ? Number(params.certStatus)
          : '',
      };

      await dispatch(
        getHistoryList(
          makeQuery(param, {
            devModelCode: dialogInfo.params.devModelCode,
            serial: dialogInfo.params.serial,
          }),
        ),
      );
    },
    [dispatch, dialogInfo.params],
  );

  useEffect(() => {
    if (!isNull(dialogParams)) {
      fetchFotaHistroy(dialogParams);
    }
    fetchConditionSelectList();
  }, [dialogParams, fetchFotaHistroy, fetchConditionSelectList]);

  useEffect(() => {
    fetchFotaHistroy(dialogParams);

    if (!certStatusList) {
      fetchComCodeList();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CDialog open={open} onClose={onClose} maxWidth={maxWidth}>
      <CSearchCondition
        sx={{ padding: 2 }}
        conditionList={dialogConditionList}
        onClickSearch={handleClickSearch}
      />
      <Divider />
      <CDialogContent grids={[3, 12, 12]}>
        <CDataGrid
          height={457}
          columns={dialogDataGridColums}
          titleButtons={[]}
          rows={
            (!isNull(fotaHistory.list) &&
              setReformatRowList(fotaHistory.list)) ||
            []
          }
          totalElement={fotaHistory.totalElements}
          isLoading={loading}
          pagination
          page={dialogParams.page}
          pageSize={dialogParams.size}
          rowsPerPage={dialogParams.rowPerPage}
          onPageSizeChange={(newPageSize) =>
            fetchDialogParams({ size: newPageSize })
          }
          onPageChange={(newPages) => fetchDialogParams({ page: newPages })}
          refreshButton={true}
          onRefreshButtonClick={handleRefreshButtonClick}
          onCellClick={(param, e) => {
            e.preventDefault();
            onClose(dialogInfo.type, param.row);
          }}
        />
      </CDialogContent>
    </CDialog>
  );
};

export default HistorySearchDialog;
