import React, { useCallback, useEffect } from 'react';
import CSearchCondition from 'components/complex/CSearchCondition';
import { Box, Divider } from '@mui/material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  deleteFotaPolicy,
  getFotaPolicyList,
  setConditionSelctList,
  setFotaPolicyMgmtParams,
} from '@/redux/reducers/fota/fotaPolicyMgmt';
import {
  getTxtToCode,
  isNull,
  makeQuery,
  onExcelDownload,
  reformatData,
} from 'common/utils';
import CDataGrid from 'components/complex/Table/CDataGrid';
import CGridActionsCellItem from 'components/complex/Table/CGridActionsCellItem';
import {
  getDevModelCode,
  GlobalLoading,
} from '@/redux/reducers/common/sharedInfo';
import { fotaAPI } from 'api';
import { postComCodeList } from '@/redux/reducers/adminMgmt/comCodeMgmt';
import { GROUP_ID } from 'common/constants';
import dayjs from 'dayjs';

const FotaPolicyMgmt = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { fotaPolicyMgmt, loading, conditionList } = useSelector(
    (state) => state.fotaPolicyMgmt,
    shallowEqual,
  );

  const fotaPolicyMgmtParams = useSelector(
    (state) => state.fotaPolicyMgmt.fotaPolicyMgmtParams,
    shallowEqual,
  );

  // 기기모델코드
  const devModelCodeList = useSelector(
    (state) => state.sharedInfo.devModelCodeList,
    shallowEqual,
  );

  const policyStatusList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.POLICY_STATUS,
      ),
    shallowEqual,
  )[0]?.codeList;

  const publishTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.PUBLISH_TYPE,
      ),
    shallowEqual,
  )[0]?.codeList;

  const targetTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.TARGET_TYPE,
      ),
    shallowEqual,
  )[0]?.codeList;

  const dataGridTitleButtons = [
    {
      id: 'FotaPolicyMgmtDetail',
      text: t('word.fota') + ' ' + t('word.policy') + ' ' + t('word.add'),
      onTitleButtonClick: () => {
        navigate('/fota/fotaPolicyMgmtDetail', {
          state: { isEdit: false },
        });
      },
    },
  ];

  const setDetailInfo = (params) => {
    return {
      ...params,
      policyStatus: String(params.policyStatus),
      targetType: getTxtToCode(params.targetType, targetTypeList, 'text'),
      publishType: getTxtToCode(params.publishType, publishTypeList, 'text'),
      publishDate: !isNull(params.publishDate)
        ? dayjs(params.publishDate).format('YYYY-MM-DDTHH:mm:ss')
        : dayjs(new Date())
            .hour(0)
            .minute(0)
            .second(0)
            .format('YYYY-MM-DDTHH:mm'),
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
            navigate('/fota/fotaPolicyMgmtDetail', {
              state: { isEdit: true, params: setDetailInfo(params.row) },
            });
          },
          hideable: params.row.policyStatus !== 1,
        }),
        CGridActionsCellItem({
          type: 'delete',
          id: params.id,
          onClick: async () => {
            await dispatch(deleteFotaPolicy(params.row.policyId));

            handleRefreshButtonClick();
          },
          hideable: params.row.policyStatus !== 1,
        }),
      ],
    },
  ].concat(
    useSelector((state) => state.fotaPolicyMgmt.dataGridColums, shallowEqual),
  );

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
          targetType: reformatData(
            'txt',
            String(item.targetType),
            'value',
            targetTypeList,
          ),
          publishType: reformatData(
            'txt',
            String(item.publishType),
            'value',
            publishTypeList,
          ),
          publishDate:
            !isNull(item.publishDate) && Number(item.publishType) !== 1
              ? reformatData('date', item.publishDate)
              : '',
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
        size: fotaPolicyMgmt.totalElements,
        totalItem: fotaPolicyMgmt.totalElements,
      },
      fotaPolicyMgmtParams,
    );
    const result = await fotaAPI.getFotaPolicyList(query);

    if (!isNull(result)) {
      const list = result.data.payload.content;

      onExcelDownload(
        t('word.fotaPolicyManage'),
        setReformatRowList(list),
        dataGridColums,
      );
    }
    dispatch(GlobalLoading(false));
  };

  const handleRefreshButtonClick = () => {
    fetchFotaPolicyMgmt(fotaPolicyMgmtParams);
  };

  const handleClickSearch = async (searchConditionParams) => {
    // console.log('searchConditionParams >> ', searchConditionParams);
    if (searchConditionParams) {
      fetchFotaPolicyMgmtParams({
        ...searchConditionParams,
      });
    }
  };

  const fetchComCodeList = useCallback(async () => {
    await dispatch(
      postComCodeList({
        groupIdList: [
          GROUP_ID.POLICY_STATUS,
          GROUP_ID.TARGET_TYPE,
          GROUP_ID.PUBLISH_TYPE,
        ],
      }),
    );
  }, [dispatch]);

  const fetchDevModeCodeList = useCallback(async () => {
    await dispatch(getDevModelCode());
  }, [dispatch]);

  const fetchFotaPolicyMgmtParams = useCallback(
    async (params) => {
      await dispatch(setFotaPolicyMgmtParams(params));
    },
    [dispatch],
  );

  const fetchFotaPolicyMgmt = useCallback(
    async (params) => {
      await dispatch(getFotaPolicyList(makeQuery(params)));
    },
    [dispatch],
  );
  const fetchConditionSelectList = useCallback(async () => {
    await dispatch(
      setConditionSelctList({ policyStatusList, devModelCodeList }),
    );
  }, [dispatch, policyStatusList, devModelCodeList]);

  useEffect(() => {
    if (!isNull(fotaPolicyMgmtParams)) {
      fetchFotaPolicyMgmt(fotaPolicyMgmtParams);
    }
    fetchConditionSelectList();
  }, [fetchFotaPolicyMgmt, fotaPolicyMgmtParams, fetchConditionSelectList]);

  useEffect(() => {
    fetchFotaPolicyMgmt(fotaPolicyMgmtParams);

    if (!policyStatusList || !publishTypeList || !targetTypeList) {
      fetchComCodeList();
    }
    if (devModelCodeList.length === 0) {
      fetchDevModeCodeList();
    }

    return () => {
      dispatch(setFotaPolicyMgmtParams('initialState'));
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
        title={t('word.fotaPolicyManage')}
        titleButtons={dataGridTitleButtons}
        columns={dataGridColums || []}
        rows={
          (!isNull(fotaPolicyMgmt.list) &&
            !isNull(policyStatusList) &&
            !isNull(publishTypeList) &&
            setReformatRowList(fotaPolicyMgmt.list)) ||
          []
        }
        totalElement={fotaPolicyMgmt.totalElements}
        isLoading={loading}
        pagination
        page={fotaPolicyMgmtParams.page}
        pageSize={fotaPolicyMgmtParams.size}
        rowsPerPage={fotaPolicyMgmtParams.rowPerPage}
        onPageSizeChange={(newPageSize) =>
          fetchFotaPolicyMgmtParams({ size: newPageSize })
        }
        onPageChange={(newPages) =>
          fetchFotaPolicyMgmtParams({ page: newPages })
        }
        exportButton={true}
        refreshButton={true}
        onExportButtonClick={handleExportButtonClick}
        onRefreshButtonClick={handleRefreshButtonClick}
      />
    </Box>
  );
};

export default FotaPolicyMgmt;
