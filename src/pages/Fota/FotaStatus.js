import React, { useCallback, useEffect, useState } from 'react';
import { Box, Divider, Grid, IconButton, Paper, Stack } from '@mui/material';
import fotaStyles from './FotaStyle';
import CSearchCondition from 'components/complex/CSearchCondition';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  deleteStatus,
  getStatusList,
  setConditionSelctList,
  setFotaStatusParams,
} from 'redux/reducers/fota/fotaStatus';
import { isNull, makeQuery, onExcelDownload, reformatData } from 'common/utils';
import {
  getDevModelCode,
  GlobalLoading,
} from 'redux/reducers/common/sharedInfo';
import { GROUP_ID } from 'common/constants';
import { postComCodeList } from 'redux/reducers/adminMgmt/comCodeMgmt';
import CDataGrid from 'components/complex/Table/CDataGrid';
import { useTranslation } from 'react-i18next';
import CGridActionsCellItem from 'components/complex/Table/CGridActionsCellItem';
import { fotaAPI } from 'api';
import { useNavigate } from 'react-router-dom';
import {
  GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
  gridDetailPanelExpandedRowsContentCacheSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid-pro';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HistorySearchDialog from './CustomDialogs/HistorySearchDialog';

const FotaStatus = () => {
  const classes = fotaStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    type: '',
    params: {},
    devModelCode: '',
  });

  function CustomDetailPanelToggle(props) {
    const { id, value: isExpanded } = props;
    const apiRef = useGridApiContext();

    const contentCache = useGridSelector(
      apiRef,
      gridDetailPanelExpandedRowsContentCacheSelector,
    );

    const hasDetail = React.isValidElement(contentCache[id]);

    return (
      <IconButton
        size="medium"
        tabIndex={-1}
        disabled={!hasDetail}
        aria-label={isExpanded ? 'Close' : 'Open'}
      >
        <ExpandMoreIcon
          sx={{
            transform: `rotateZ(${isExpanded ? 180 : 0}deg)`,
            transition: (theme) =>
              theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
              }),
          }}
          fontSize="inherit"
        />
      </IconButton>
    );
  }

  const dataGridColums = [
    {
      ...GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
      type: 'actions',
      renderCell: (params) => (
        <CustomDetailPanelToggle id={params.id} value={params.value} />
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      align: 'center',
      hideable: false,
      getActions: (params) => [
        CGridActionsCellItem({
          type: 'delete',
          id: params.id,
          onClick: async () => {
            // console.log('params >> ', params);
            await dispatch(deleteStatus(params.row.serial));

            handleRefreshButtonClick();
          },
        }),
        CGridActionsCellItem({
          type: 'history',
          id: params.id,
          onClick: async () => {
            setOpenDialog(true);
            setDialogInfo((prevState) => ({
              ...prevState,
              params: params.row,
            }));
          },
        }),
      ],
    },
  ].concat(
    useSelector((state) => state.fotaStatus.dataGridColums, shallowEqual),
  );

  const {
    conditionList,
    fotaStatusParams,
    fotaStatus,
    loading,
    detailedGridColums,
  } = useSelector((state) => state.fotaStatus, shallowEqual);

  const fotaStatusList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.FOTA_STATUS,
      ),
    shallowEqual,
  )[0]?.codeList;

  const certStatusList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.CERT_STATUS,
      ),
    shallowEqual,
  )[0]?.codeList;

  // 기기모델코드
  const devModelCodeList = useSelector(
    (state) => state.sharedInfo.devModelCodeList,
    shallowEqual,
  );

  const fetchFotaStatusParams = useCallback(
    async (params) => {
      await dispatch(setFotaStatusParams(params));
    },
    [dispatch],
  );

  const fetchConditionSelectList = useCallback(async () => {
    await dispatch(
      setConditionSelctList({
        fotaStatusList,
        certStatusList,
        devModelCodeList,
      }),
    );
  }, [dispatch, fotaStatusList, certStatusList, devModelCodeList]);

  const fetchDevModeCodeList = useCallback(async () => {
    await dispatch(getDevModelCode());
  }, [dispatch]);

  const fetchComCodeList = useCallback(async () => {
    await dispatch(
      postComCodeList({
        groupIdList: [GROUP_ID.FOTA_STATUS, GROUP_ID.CERT_STATUS],
      }),
    );
  }, [dispatch]);

  const fetchFotaStatus = useCallback(
    async (params) => {
      await dispatch(getStatusList(makeQuery(params)));
    },
    [dispatch],
  );

  const dialogClose = useCallback(async (type, selectedRow) => {
    setOpenDialog(false);
  }, []);

  const setReformatRowList = (list) => {
    let rows = [];

    if (Array.isArray(list) && list.length > 0) {
      list.forEach((item, index) => {
        if (!isNull(item)) {
          rows.push({
            ...item,
            id: index,
            regDate: !isNull(item.regDate)
              ? reformatData('date', item.regDate)
              : '',
            updDate: reformatData('date', item.updDate),
            isCertExpired: reformatData('yn', item.isCertExpired),
            reported: item.reported,
            desired: item.desired,
          });
        }
      });
    }
    return rows;
  };

  /**
   * Event Handler
   */

  const handleClickSearch = async (searchConditionParams) => {
    let params = {
      ...searchConditionParams,
      fotaShadowStatus: !isNull(searchConditionParams.fotaStatus)
        ? Number(searchConditionParams.fotaStatus)
        : '',
      certShadowStatus: !isNull(searchConditionParams.certStatus)
        ? Number(searchConditionParams.certStatus)
        : '',
    };

    if (searchConditionParams) {
      fetchFotaStatusParams({
        ...params,
      });
    }
  };
  const handleExportButtonClick = async () => {
    dispatch(GlobalLoading(true));
    let query = makeQuery(
      {
        page: 0,
        size: fotaStatus.totalElements,
        totalItem: fotaStatus.totalElements,
      },
      fotaStatusParams,
    );

    const result = await fotaAPI.getStatusList(query);

    if (!isNull(result) && !isNull(result.data.payload)) {
      const list = result.data.payload.content;
      onExcelDownload(
        t('word.fota') + t('word.statusSearch'),
        setReformatRowList(list),
        dataGridColums,
      );
    } else {
      const res =
        (await fotaAPI.getStatusList(makeQuery(fotaStatusParams))) || [];

      onExcelDownload(
        t('word.fota') + t('word.statusSearch'),
        setReformatRowList(res.data.payload.content),
        dataGridColums,
      );
    }
    dispatch(GlobalLoading(false));
  };

  const handleRefreshButtonClick = () => {
    fetchFotaStatus(fotaStatusParams);
  };

  const getDetailPanelHeight = React.useCallback(() => 250, []);

  const getDetailPanelContent = React.useCallback(
    ({ row }) => <DetailPanelContent row={row} />,
    [],
  );

  function DetailPanelContent({ row: rowProp }) {
    const desiredList = [rowProp.desired];
    const reportedList = [rowProp.reported];

    return (
      <Stack
        sx={{
          py: 2,
          height: 1,
          boxSizing: 'border-box',
        }}
        direction="column"
      >
        <Paper
          sx={{
            flex: 1,
            mx: 'auto',
            width: '100%',
            p: 1,
          }}
        >
          <Stack direction="column" spacing={2} sx={{ height: 1 }}>
            <Grid container>
              <Grid item md={12}>
                <CDataGrid
                  height={100}
                  density="compact"
                  sx={{ flex: 1 }}
                  hideFooter
                  title="Desired Data"
                  columns={detailedGridColums}
                  rows={!isNull(desiredList) && setReformatRowList(desiredList)}
                />
              </Grid>
              <Grid item md={12}>
                <CDataGrid
                  height={100}
                  density="compact"
                  sx={{ flex: 1 }}
                  hideFooter
                  title="Reported Data"
                  columns={detailedGridColums}
                  rows={
                    !isNull(reportedList) && setReformatRowList(reportedList)
                  }
                />
              </Grid>
            </Grid>
          </Stack>
        </Paper>
      </Stack>
    );
  }

  useEffect(() => {
    if (!isNull(fotaStatusParams)) {
      fetchFotaStatus(fotaStatusParams);
    }
    fetchConditionSelectList();
  }, [fetchConditionSelectList, fetchFotaStatus, fotaStatusParams]);

  useEffect(() => {
    fetchFotaStatus(fotaStatusParams);

    if (!fotaStatusList || !certStatusList) {
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
        title={t('word.statusSearch')}
        columns={dataGridColums || []}
        rows={
          (!isNull(fotaStatus.list) && setReformatRowList(fotaStatus.list)) ||
          []
        }
        rowThreshold={0}
        getDetailPanelHeight={getDetailPanelHeight}
        getDetailPanelContent={getDetailPanelContent}
        totalElement={fotaStatus.totalElements}
        isLoading={loading}
        pagination
        page={fotaStatusParams.page}
        pageSize={fotaStatusParams.size}
        rowsPerPage={fotaStatusParams.rowPerPage}
        onPageSizeChange={(newPageSize) =>
          fetchFotaStatusParams({ size: newPageSize })
        }
        onPageChange={(newPages) => fetchFotaStatusParams({ page: newPages })}
        exportButton={true}
        refreshButton={true}
        onExportButtonClick={handleExportButtonClick}
        onRefreshButtonClick={handleRefreshButtonClick}
      />
      {openDialog && (
        <HistorySearchDialog
          open={openDialog}
          onClose={dialogClose}
          maxWidth={'md'}
          dialogInfo={dialogInfo}
        />
      )}
    </Box>
  );
};

export default FotaStatus;
