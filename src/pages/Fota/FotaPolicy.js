import React, { useCallback, useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import fotaStyles from './FotaStyle';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  isNull,
  makeQuery,
  makeRowsFormat,
  responseCheck,
} from '../../common/utils';
import { getFotaPolicyList } from '../../redux/reducers/fotaInfoSlice';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CSearchCondition from '../../components/complex/CSearchCondition';
import CDataGrid from '../../components/complex/Table/CDataGrid';

const FotaPolicy = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [initial, setInitial] = useState(true);
  const [param, setParam] = useState({
    page: 0,
    size: 5,
    rowPerPage: [5, 10, 20],
  });
  const [searchOption, setSearchOption] = useState(null);
  const codes = useSelector((state) => state.sharedInfo.codes);
  const fotaPolicy = useSelector((state) => state.fotaInfo.fotaPolicy);

  const toolbarBtnList = [
    { text: t('word.reg'), startIcon: <AddIcon /> },
    { text: t('word.refresh'), startIcon: <RefreshIcon />, color: 'success' },
    { text: t('word.download'), startIcon: <SaveAltIcon />, color: 'success' },
  ];
  const conditionList = [
    {
      id: 'datetime-local',
      category: 'startDate',
      label: t('word.term'),
      type: 'textBox',
      value: dayjs(new Date())
        .add(-7, 'days')
        .hour(0)
        .minute(0)
        .second(0)
        .format('YYYY-MM-DDTHH:mm'),
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'datetime-local',
      category: 'endDate',
      label: t('word.term'),
      type: 'textBox',
      value: dayjs(new Date())
        .hour(23)
        .minute(59)
        .second(59)
        .format('YYYY-MM-DDTHH:mm'),
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'policyStatus',
      category: 'fotaShadowStatus',
      label: t('word.policy') + ' ' + t('word.status'),
      type: 'selectBox',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'devModelCode',
      category: 'devModelCode',
      label: t('word.devModelCode'),
      type: 'autoSelectBox',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'policyName',
      category: 'policyName',
      label: t('word.policy') + ' ' + t('word.name'),
      type: 'textBox',
      value: '',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'targetId',
      category: 'targetId',
      label: t('word.target') + ' ' + t('word.id'),
      type: 'textBox',
      value: '',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
  ];
  const columns = [
    {
      field: 'editDelete',
      headerName: '',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filter: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        // 신규
        // if (params.row.policyStatus === 1) {
        //   return (
        //     <MatEdit
        //       category={"fotaPolicyMng"}
        //       param={params.row}
        //       searchOption={searchOption}
        //     />
        //   );
        // }
      },
    },
    {
      field: 'devModelCode',
      headerName: t('word.devModelCode'),
      width: 120,
      editable: false,
      headerAlign: 'center',
      align: 'left',
    },
    {
      field: 'policyName',
      headerName: t('word.policy') + ' ' + t('word.name'),
      width: 300,
      editable: false,
      headerAlign: 'center',
      align: 'left',
    },
    {
      field: 'policyDesc',
      headerName: t('word.policy') + ' ' + t('word.desc'),
      width: 300,
      editable: false,
      headerAlign: 'center',
      align: 'left',
    },
    {
      field: 'policyStatusName',
      headerName: t('word.policy') + ' ' + t('word.status'),
      width: 120,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'targetType',
      headerName:
        t('word.publish') + ' ' + t('word.target') + ' ' + t('word.type'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'wifiFrmwrName',
      headerName:
        t('word.wifi') + ' ' + t('word.firmware') + ' ' + t('word.name'),
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'left',
    },
    {
      field: 'wifiFrmwrVer',
      headerName:
        t('word.wifi') + ' ' + t('word.firmware') + ' ' + t('word.ver'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'right',
    },
    {
      field: 'mcuFrmwrName',
      headerName:
        t('word.mcu') + ' ' + t('word.firmware') + ' ' + t('word.name'),
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'left',
    },
    {
      field: 'mcuFrmwrVer',
      headerName:
        t('word.mcu') + ' ' + t('word.firmware') + ' ' + t('word.ver'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'right',
    },
    {
      field: 'regId',
      headerName: t('word.regId'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'regDate',
      headerName: t('word.regDate'),
      width: 180,
      editable: false,
      headerAlign: 'center',
      align: 'right',
    },
    {
      field: 'updId',
      headerName: t('word.updId'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'updDate',
      headerName: t('word.updDate'),
      width: 180,
      editable: false,
      headerAlign: 'center',
      align: 'right',
    },
    {
      field: 'useYn',
      headerName: t('word.use') + ' ' + t('word.yn'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
  ];

  // 리프레시 누른 경우
  const onRefresh = () => {
    // setStartDate(
    //   dayjs(new Date())
    //     .add(-7, 'days')
    //     .hour(0)
    //     .minute(0)
    //     .second(0)
    //     .format('YYYY-MM-DDTHH:mm'),
    // );
    // setEndDate(
    //   dayjs(new Date())
    //     .hour(23)
    //     .minute(59)
    //     .second(59)
    //     .format('YYYY-MM-DDTHH:mm'),
    // );

    setSearchOption(null);

    onFetchData();
    window.scrollTo(0, 0);
  };

  const onFetchData = useCallback(
    async (data, conditions) => {
      if (initial) {
        setInitial(false);
      }

      setIsLoading(true);
      let params = isNull(data) ? param : data;
      let option = '';

      if (!isNull(conditions)) {
        option = conditions;
        setSearchOption(conditions);
      } else if (!isNull(searchOption)) {
        option = searchOption;
      }

      const result = await dispatch(
        getFotaPolicyList({
          param: makeQuery(params, option),
        }),
      );
      if (responseCheck(result)) {
        setIsLoading(false);
      }
    },
    [dispatch, param, searchOption, initial],
  );

  useEffect(() => {
    if (initial) {
      onFetchData();
    }
  }, [onFetchData, initial, fotaPolicy]);

  return (
    <Box>
      <CSearchCondition
        onFetchData={onFetchData}
        conditionList={conditionList}
      />
      <Divider />
      <CDataGrid
        title={t('word.fotaPolicyManage')}
        columns={columns}
        rows={
          !isNull(fotaPolicy.list) && makeRowsFormat(fotaPolicy.list, codes)
        }
        toolbarBtnList={toolbarBtnList}
        totalElement={fotaPolicy.totalElements}
        param={param}
        isLoading={isLoading}
        searchOption={searchOption}
        category={'fotaPolicy'}
        onFetchData={onFetchData}
        onRefresh={onRefresh}
      />
    </Box>
  );
};

export default FotaPolicy;
