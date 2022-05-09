import React, { useCallback, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  dateToTimestampConvert,
  isNull,
  makeQuery,
  onExcelDownload,
  reformatData,
} from 'common/utils';
import CSearchCondition from 'components/complex/CSearchCondition';
import CDataGrid from 'components/complex/Table/CDataGrid';
import { useNavigate } from 'react-router-dom';
import {
  getDevModelCode,
  GlobalLoading,
} from '@/redux/reducers/common/sharedInfo';
import { fotaAPI } from 'api';
import {
  deleteFirmware,
  getFirmwareList,
  setConditionSelctList,
  setFirmwareMgmtParams,
} from '@/redux/reducers/fota/firmwareMgmt';
import CGridActionsCellItem from 'components/complex/Table/CGridActionsCellItem';
import { postComCodeList } from '@/redux/reducers/adminMgmt/comCodeMgmt';
import { GROUP_ID } from 'common/constants';

const FirmwareMgmt = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const setDetailInfo = (params) => {
    return {
      ...params,
      useYn: params.useYn === 'Y',
      frmwrType: params.frmwrType === 'WIFI' ? '1' : '2',
      hwType: params.frmwrType === 'WIFI' ? String(params.hwType) : '0',
      regDate: dateToTimestampConvert(params.regDate),
      updDate: dateToTimestampConvert(params.updDate),
    };
  };

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
          onClick: () => {
            setDetailInfo(params.row);

            navigate('/fota/FirmwareMgmtDetail', {
              state: { isEdit: true, params: setDetailInfo(params.row) },
            });
          },
        }),
        CGridActionsCellItem({
          type: 'delete',
          id: params.id,
          onClick: async () => {
            await dispatch(deleteFirmware(params.row.frmwrId));

            handleRefreshButtonClick();
          },
        }),
      ],
    },
  ].concat(
    useSelector((state) => state.firmwareMgmt.dataGridColums, shallowEqual),
  );

  const { firmwareMgmt, loading, conditionList } = useSelector(
    (state) => state.firmwareMgmt,
    shallowEqual,
  );
  const firmwareMgmtParams = useSelector(
    (state) => state.firmwareMgmt.firmwareMgmtParams,
    shallowEqual,
  );

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

  const dataGridTitleButtons = [
    {
      id: 'FirmwareMgmtDetail',
      text: t('word.firmware') + ' ' + t('word.add'),
      onTitleButtonClick: () => {
        navigate('/fota/firmwareMgmtDetail', {
          state: { isEdit: false },
        });
      },
    },
  ];

  const setReformatRowList = (list) => {
    let rows = [];
    if (Array.isArray(list) && list.length > 0) {
      list.forEach((item, index) => {
        rows.push({
          ...item,
          useYn: reformatData('yn', item.useYn),
          regDate: reformatData('date', item.regDate),
          updDate: reformatData('date', item.updDate),
          fileSizeTxt: reformatData('fileSize', item.fileSize),
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

  /**
   * Event Handler
   */

  const handleExportButtonClick = async () => {
    dispatch(GlobalLoading(true));
    let query = makeQuery(
      {
        page: 0,
        size: firmwareMgmt.totalElements,
        totalItem: firmwareMgmt.totalElements,
      },
      firmwareMgmtParams,
    );
    const result = await fotaAPI.getFirmwareList(query);

    if (!isNull(result)) {
      const list = result.data.payload.content;

      onExcelDownload(
        t('word.firmwareManage'),
        setReformatRowList(list),
        dataGridColums,
      );
    }
    dispatch(GlobalLoading(false));
  };

  const handleRefreshButtonClick = () => {
    fetchFirmwareMgmt(firmwareMgmtParams);
  };

  const handleClickSearch = async (searchConditionParams) => {
    if (searchConditionParams) {
      fetchFirmwareMgmtParams({
        ...searchConditionParams,
      });
    }
  };

  /**
   * 013 : 프로토콜 유형
   */
  const fetchComCodeList = useCallback(async () => {
    await dispatch(postComCodeList({ groupIdList: [GROUP_ID.FIRMWARE_TYPE] }));
  }, [dispatch]);

  const fetchDevModeCodeList = useCallback(async () => {
    await dispatch(getDevModelCode());
  }, [dispatch]);

  const fetchFirmwareMgmtParams = useCallback(
    async (params) => {
      await dispatch(setFirmwareMgmtParams(params));
    },
    [dispatch],
  );

  const fetchConditionSelectList = useCallback(async () => {
    await dispatch(setConditionSelctList({ frmwrTypeList, devModelCodeList }));
  }, [dispatch, frmwrTypeList, devModelCodeList]);

  const fetchFirmwareMgmt = useCallback(
    async (params) => {
      // console.log('@@ params >> ', params);
      await dispatch(getFirmwareList(makeQuery(params)));
    },
    [dispatch],
  );

  useEffect(() => {
    if (!isNull(firmwareMgmtParams)) {
      fetchFirmwareMgmt(firmwareMgmtParams);
    }
    fetchConditionSelectList();
  }, [fetchFirmwareMgmt, firmwareMgmtParams, fetchConditionSelectList]);

  useEffect(() => {
    fetchFirmwareMgmt(firmwareMgmtParams);

    if (!frmwrTypeList) {
      fetchComCodeList();
    }
    if (devModelCodeList.length === 0) {
      fetchDevModeCodeList();
    }

    return () => {
      dispatch(setFirmwareMgmtParams('initialState'));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <CSearchCondition
        conditionList={conditionList}
        onClickSearch={handleClickSearch}
      />
      <Divider sx={{ mt: 1 }} />
      <CDataGrid
        height={650}
        title={t('word.firmwareManage')}
        titleButtons={dataGridTitleButtons}
        columns={dataGridColums || []}
        rows={
          (!isNull(firmwareMgmt.list) &&
            !isNull(frmwrTypeList) &&
            setReformatRowList(firmwareMgmt.list)) ||
          []
        }
        totalElement={firmwareMgmt.totalElements}
        isLoading={loading}
        pagination
        page={firmwareMgmtParams.page}
        pageSize={firmwareMgmtParams.size}
        rowsPerPage={firmwareMgmtParams.rowPerPage}
        onPageSizeChange={(newPageSize) =>
          fetchFirmwareMgmtParams({ size: newPageSize })
        }
        onPageChange={(newPages) => fetchFirmwareMgmtParams({ page: newPages })}
        exportButton={true}
        refreshButton={true}
        onExportButtonClick={handleExportButtonClick}
        onRefreshButtonClick={handleRefreshButtonClick}
      />
    </Box>
  );
};

export default FirmwareMgmt;
