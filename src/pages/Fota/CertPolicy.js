import React, { useCallback, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import fotaStyles from './FotaStyle';
import CSearchCondition from 'components/complex/CSearchCondition';
import CDataGrid from 'components/complex/Table/CDataGrid';
import {
  getTxtToCode,
  isNull,
  makeQuery,
  onExcelDownload,
  reformatData,
} from 'common/utils';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  deleteCertPolicy,
  getCertPolicyList,
  setCertPolicyParams,
  setConditionSelctList,
} from 'redux/reducers/fota/certPolicyMgmt';
import CGridActionsCellItem from 'components/complex/Table/CGridActionsCellItem';
import { GROUP_ID } from 'common/constants';
import {
  getDevModelCode,
  GlobalLoading,
} from 'redux/reducers/common/sharedInfo';
import { fotaAPI } from 'api';
import { postComCodeList } from 'redux/reducers/adminMgmt/comCodeMgmt';
import dayjs from 'dayjs';

const CertPolicy = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const classes = fotaStyles();

  const { certPolicyMgmt, loading, conditionList } = useSelector(
    (state) => state.certPolicyMgmt,
    shallowEqual,
  );

  const dataGridTitleButtons = [
    {
      id: 'certPolicyMgmtDetail',
      text: t('word.cert') + ' ' + t('word.policy') + ' ' + t('word.add'),
      onTitleButtonClick: () => {
        navigate('/fota/certPolicyMgmtDetail', {
          state: { isEdit: false },
        });
      },
    },
  ];

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
            const row = {
              ...params.row,
              targetType: getTxtToCode(
                params.row.targetType,
                targetTypeList,
                'text',
              ),
              applyCertType: getTxtToCode(
                params.row.applyCertType,
                certTypeList,
                'text',
              ),
              policyStatus: getTxtToCode(
                params.row.policyStatus,
                policyStatusList,
                'text',
              ),
              publishType: getTxtToCode(
                params.row.publishType,
                publishTypeList,
                'text',
              ),
              publishDate: !isNull(params.row.publishDate)
                ? dayjs(params.row.publishDate).format('YYYY-MM-DDTHH:mm')
                : dayjs(new Date())
                    .hour(0)
                    .minute(0)
                    .second(0)
                    .format('YYYY-MM-DDTHH:mm'),
            };

            navigate('/fota/certPolicyMgmtDetail', {
              state: { isEdit: true, params: row },
            });
          },
          hideable:
            Number(
              getTxtToCode(params.row.policyStatus, policyStatusList, 'text'),
            ) !== 1,
        }),
        CGridActionsCellItem({
          type: 'delete',
          id: params.id,
          onClick: async () => {
            await dispatch(deleteCertPolicy(params.row.policyId));

            // await dispatch(
            //   setSnackbar({
            //     snackbarOpen: true,
            //     severity: 'success',
            //     autoHideDuration: 3000,
            //     snackbarMessage: i18n.t('desc.alert.saveDelete'),
            //   }),
            // );

            handleRefreshButtonClick();
          },
          hideable:
            Number(
              getTxtToCode(params.row.policyStatus, policyStatusList, 'text'),
            ) !== 1,
        }),
      ],
    },
  ].concat(
    useSelector((state) => state.certPolicyMgmt.dataGridColums, shallowEqual),
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

  const certTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.CERT_TYPE,
      ),
    shallowEqual,
  )[0]?.codeList;

  // 기기모델코드
  const devModelCodeList = useSelector(
    (state) => state.sharedInfo.devModelCodeList,
    shallowEqual,
  );

  const certPolicyMgmtParams = useSelector(
    (state) => state.certPolicyMgmt.certPolicyMgmtParams,
    shallowEqual,
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
          publishDate:
            !isNull(item.publishDate) && Number(item.publishType) !== 1
              ? reformatData('date', item.publishDate)
              : '',
          policyStatus: reformatData(
            'txt',
            String(item.policyStatus),
            'value',
            policyStatusList,
          ),
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
          applyCertType: reformatData(
            'txt',
            String(item.applyCertType),
            'value',
            certTypeList,
          ),
        });
      });
    }

    return rows;
  };

  const fetchCertPolicyParams = useCallback(
    async (params) => {
      await dispatch(setCertPolicyParams(params));
    },
    [dispatch],
  );
  const fetchDevModeCodeList = useCallback(async () => {
    await dispatch(getDevModelCode());
  }, [dispatch]);

  const fetchCertPolicyMgmt = useCallback(
    async (params) => {
      await dispatch(getCertPolicyList(makeQuery(params)));
    },
    [dispatch],
  );
  const fetchConditionSelectList = useCallback(async () => {
    await dispatch(
      setConditionSelctList({ policyStatusList, devModelCodeList }),
    );
  }, [dispatch, policyStatusList, devModelCodeList]);

  const fetchComCodeList = useCallback(async () => {
    await dispatch(
      postComCodeList({
        groupIdList: [
          GROUP_ID.POLICY_STATUS,
          GROUP_ID.TARGET_TYPE,
          GROUP_ID.PUBLISH_TYPE,
          GROUP_ID.CERT_TYPE,
        ],
      }),
    );
  }, [dispatch]);

  /**
   * Event Handler
   */
  const handleClickSearch = async (searchConditionParams) => {
    if (searchConditionParams) {
      fetchCertPolicyParams({
        ...searchConditionParams,
      });
    }
  };
  const handleExportButtonClick = async () => {
    dispatch(GlobalLoading(true));
    let query = makeQuery(
      {
        page: 0,
        size: certPolicyMgmt.totalElements,
        totalItem: certPolicyMgmt.totalElements,
      },
      certPolicyMgmtParams,
    );
    const result = await fotaAPI.getCertPolicyList(query);

    if (!isNull(result)) {
      const list = result.data.payload.content;

      onExcelDownload(
        t('word.certPolicyManage'),
        setReformatRowList(list),
        dataGridColums,
      );
    }
    dispatch(GlobalLoading(false));
  };

  const handleRefreshButtonClick = () => {
    fetchCertPolicyMgmt(certPolicyMgmtParams);
  };

  useEffect(() => {
    fetchCertPolicyMgmt(certPolicyMgmtParams);
    if (!isNull(certPolicyMgmtParams)) {
      fetchCertPolicyParams(certPolicyMgmtParams);
    }
    fetchConditionSelectList();
  }, [
    fetchCertPolicyParams,
    certPolicyMgmtParams,
    fetchConditionSelectList,
    fetchCertPolicyMgmt,
  ]);

  useEffect(() => {
    fetchCertPolicyMgmt(certPolicyMgmtParams);

    if (
      !policyStatusList ||
      !publishTypeList ||
      !targetTypeList ||
      !certTypeList
    ) {
      fetchComCodeList();
    }
    if (devModelCodeList.length === 0) {
      fetchDevModeCodeList();
    }
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
        title={t('word.certPolicyManage')}
        titleButtons={dataGridTitleButtons}
        columns={dataGridColums}
        rows={
          (!isNull(certPolicyMgmt.list) &&
            !isNull(policyStatusList) &&
            setReformatRowList(certPolicyMgmt.list)) ||
          []
        }
        totalElement={certPolicyMgmt.totalElements}
        isLoading={loading}
        pagination
        page={certPolicyMgmtParams.page}
        pageSize={certPolicyMgmtParams.size}
        rowsPerPage={certPolicyMgmtParams.rowPerPage}
        onPageSizeChange={(newPageSize) =>
          fetchCertPolicyParams({ size: newPageSize })
        }
        onPageChange={(newPages) => fetchCertPolicyParams({ page: newPages })}
        exportButton={true}
        refreshButton={true}
        onExportButtonClick={handleExportButtonClick}
        onRefreshButtonClick={handleRefreshButtonClick}
      />
    </Box>
  );
};

export default CertPolicy;
