import React, { useCallback, useEffect, useState } from 'react';
import {
  Accordion,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import fotaStyles from './FotaStyle';
import MainCard from '../../components/UiComponent/MainCard';
import SearchCondition from '../../components/SearchCondition';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DataGridTables from '../../components/Table/DataGridTables';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getFirmwareList } from '../../redux/reducers/fotaInfoSlice';
import {
  isNull,
  makeQuery,
  makeRowsFormat,
  responseCheck,
} from '../../common/utils';
import dayjs from 'dayjs';

const FirmwareManage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [initial, setInitial] = useState(true);
  const codes = useSelector((state) => state.sharedInfo.codes);
  const firmwareMng = useSelector((state) => state.fotaInfo.firmwareMng);
  const [startDate, setStartDate] = useState(
    dayjs(new Date())
      .add(-7, 'days')
      .hour(0)
      .minute(0)
      .second(0)
      .format('YYYY-MM-DDTHH:mm'),
  );

  const [endDate, setEndDate] = useState(
    dayjs(new Date()).hour(23).minute(59).second(59).format('YYYY-MM-DDTHH:mm'),
  );
  const [param, setParam] = useState({
    page: 0,
    size: 5,
    rowPerPage: [5, 10, 20],
  });
  const [searchOption, setSearchOption] = useState(null);

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
      // renderCell: (params) => {
      //   return (
      //     <MatEdit
      //       category={"firmwareMng"}
      //       param={params.row}
      //       searchOption={searchOption}
      //     />
      //   );
      // },
    },
    {
      field: 'frmwrName',
      headerName: t('word.firmware') + ' ' + t('word.name'),
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'frmwrVer',
      headerName: t('word.firmware') + ' ' + t('word.ver'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'fileName',
      headerName: t('word.file') + ' ' + t('word.name'),
      width: 300,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'frmwrType',
      headerName: t('word.firmware') + ' ' + t('word.type'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'devModelCode',
      headerName: t('word.devModelCode'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'fileSizeTxt',
      headerName: t('word.file') + ' ' + t('word.size'),
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
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
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
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
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
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

  const conditionList = [
    {
      id: 'startDate',
      label: t('word.term'),
      type: 'dateRange',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'endDate',
      label: t('word.term'),
      type: 'dateRange',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'frmwrType',
      category: 'frmwrType',
      label: t('word.firmware') + ' ' + t('word.type'),
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
      id: 'frmwrName',
      label: t('word.firmware') + ' ' + t('word.name'),
      type: 'textBox',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'frmwrVer',
      label: t('word.firmware') + ' ' + t('word.ver'),
      type: 'textBox',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
  ];

  const onFetchData = useCallback(
    async (data, conditions) => {
      setIsLoading(true);
      if (initial) {
        setInitial(false);
      }

      let params = isNull(data) ? param : data;
      let option = '';

      // 검색 조건
      if (!isNull(conditions)) {
        option = conditions;
        setSearchOption(conditions);
      } else if (!isNull(searchOption)) {
        option = searchOption;
      }

      const result = await dispatch(
        getFirmwareList({
          param: makeQuery(params, option),
        }),
      );
      // console.log("result >> ", result);
      if (responseCheck(result)) {
        setIsLoading(false);
      }
    },
    [dispatch, param, searchOption, initial],
  );
  // 리프레시 누른 경우
  const onRefresh = () => {
    setStartDate(
      dayjs(new Date())
        .add(-7, 'days')
        .hour(0)
        .minute(0)
        .second(0)
        .format('YYYY-MM-DDTHH:mm'),
    );
    setEndDate(
      dayjs(new Date())
        .hour(23)
        .minute(59)
        .second(59)
        .format('YYYY-MM-DDTHH:mm'),
    );

    setSearchOption(null);

    onFetchData();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (initial) {
      onFetchData();
    }
  }, [onFetchData, initial, firmwareMng]);

  return (
    <Box>
      <SearchCondition
        onFetchData={onFetchData}
        conditionList={conditionList}
      />
      <Divider />
      <DataGridTables
        columns={columns}
        rows={
          !isNull(firmwareMng.list) && makeRowsFormat(firmwareMng.list, codes)
        }
        totalElement={firmwareMng.totalElements}
        param={param}
        isLoading={isLoading}
        searchOption={searchOption}
        category={'firmwareManage'}
        onFetchData={onFetchData}
        onRefresh={onRefresh}
      />
    </Box>
  );
};

export default FirmwareManage;
