import React, { useCallback, useEffect } from 'react';
import CDialog from 'components/basic/CDialog';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CDialogContent from 'components/basic/CDialogContent';
import { isNull, makeQuery, reformatData } from 'common/utils';
import CDataGrid from 'components/complex/Table/CDataGrid';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  setDialogConditionSelectList,
  setDialogParams,
} from '@/redux/reducers/fota/fotaPolicyMgmt';
import { GROUP_ID } from 'common/constants';
import { postComCodeList } from '@/redux/reducers/adminMgmt/comCodeMgmt';
import { getDevModelCode } from '@/redux/reducers/common/sharedInfo';
import { getFirmwareList } from '@/redux/reducers/fota/firmwareMgmt';
import CSearchCondition from 'components/complex/CSearchCondition';

const FotaPolicyMgmtDialog = (props) => {
  const { open, onClose, maxWidth, dialogInfo } = props;

  const dispatch = useDispatch();
  const { firmwareMgmt, loading } = useSelector(
    (state) => state.firmwareMgmt,
    shallowEqual,
  );

  const { dialogParams, dialogDataGridColums, dialogConditionList } =
    useSelector((state) => state.fotaPolicyMgmt, shallowEqual);

  // 펌웨어 타입
  const frmwrTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.FIRMWARE_TYPE,
      ),
    shallowEqual,
  )[0]?.codeList;

  // 기기모델코드
  const devModelCodeList = useSelector(
    (state) => state.sharedInfo.devModelCodeList,
    shallowEqual,
  );

  const setReformatRowList = (list) => {
    let rows = [];
    if (Array.isArray(list) && list.length > 0) {
      list.forEach((item, index) => {
        rows.push({
          ...item,
          frmwrType: reformatData(
            'txt',
            String(item.frmwrType),
            'value',
            frmwrTypeList,
          ),
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
    fetchFirmwareMgmt(dialogParams);
  };

  const fetchComCodeList = useCallback(async () => {
    await dispatch(postComCodeList({ groupIdList: [GROUP_ID.FIRMWARE_TYPE] }));
  }, [dispatch]);

  const fetchDevModeCodeList = useCallback(async () => {
    await dispatch(getDevModelCode());
  }, [dispatch]);

  const fetchDialogParams = useCallback(
    async (params) => {
      await dispatch(setDialogParams(params));
    },
    [dispatch],
  );

  const fetchConditionSelectList = useCallback(async () => {
    await dispatch(
      setDialogConditionSelectList({ frmwrTypeList, devModelCodeList }),
    );
  }, [dispatch, frmwrTypeList, devModelCodeList]);

  const fetchFirmwareMgmt = useCallback(
    async (params) => {
      await dispatch(
        getFirmwareList(makeQuery(params, { frmwrType: dialogInfo.type })),
      );
    },
    [dispatch, dialogInfo.type],
  );

  useEffect(() => {
    if (!isNull(dialogParams)) {
      fetchFirmwareMgmt(dialogParams);
    }
    fetchConditionSelectList();
  }, [dialogParams, fetchFirmwareMgmt, fetchConditionSelectList]);

  useEffect(() => {
    // fetchFirmwareMgmt(firmwareMgmtParams);

    if (!frmwrTypeList) {
      fetchComCodeList();
    }
    if (devModelCodeList.length === 0) {
      fetchDevModeCodeList();
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
            (!isNull(firmwareMgmt.list) &&
              !isNull(frmwrTypeList) &&
              setReformatRowList(firmwareMgmt.list)) ||
            []
          }
          totalElement={firmwareMgmt.totalElements}
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

export default FotaPolicyMgmtDialog;
