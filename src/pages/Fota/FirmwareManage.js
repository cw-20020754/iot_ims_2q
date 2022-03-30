import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getFirmwareList } from 'redux/reducers/fotaInfoSlice';
import {
  isNull,
  makeQuery,
  makeRowsFormat,
  onExcelDownload,
  responseCheck,
} from 'common/utils';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CSearchCondition from 'components/complex/CSearchCondition';
import CDataGrid from 'components/complex/Table/CDataGrid';
import { useNavigate } from 'react-router-dom';
import { getDatagridInfo } from 'redux/reducers/changeStateSlice';
import { fotaAPI } from 'api';
import CMatEdit from 'components/complex/Table/CMatEdit';

const FirmwareManage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
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
  const toolbarItem = useSelector((state) => state.changeState.toolbarItem);

  const toolbarBtnList = [
    { text: t('word.reg'), startIcon: <AddIcon />, type: 'regist' },
    {
      text: t('word.refresh'),
      startIcon: <RefreshIcon />,
      color: 'success',
      type: 'refresh',
    },
    {
      text: t('word.download'),
      startIcon: <SaveAltIcon />,
      color: 'success',
      type: 'download',
    },
  ];

  const columns = useMemo(
    () => [
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
          return (
            <CMatEdit
              category={'firmwareMng'}
              param={params.row}
              searchOption={searchOption}
              editList={[
                {
                  btnIcon: <EditIcon />,
                  type: 'edit',
                },
                {
                  btnIcon: <DeleteIcon />,
                  color: 'success',
                  type: 'delete',
                },
              ]}
            />
          );
        },
      },
      {
        field: 'frmwrName',
        headerName: t('word.firmware') + ' ' + t('word.nm'),
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
        headerName: t('word.file') + ' ' + t('word.nm'),
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
    ],
    [t, searchOption],
  );

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
      category: 'frmwrName',
      label: t('word.firmware') + ' ' + t('word.nm'),
      type: 'textBox',
      value: '',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'frmwrVer',
      category: 'frmwrVer',
      label: t('word.firmware') + ' ' + t('word.ver'),
      type: 'textBox',
      value: '',
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

      setParam((prevState) => ({
        ...prevState,
        ...data,
      }));

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
      if (responseCheck(result)) {
        setIsLoading(false);
      }
    },
    [dispatch, param, searchOption, initial],
  );
  // 리프레시 누른 경우
  const onRefresh = useCallback(() => {
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
  }, [onFetchData]);

  const excelDownload = useCallback(async () => {
    setIsLoading(true);

    let query = makeQuery(
      {
        page: 0,
        size: firmwareMng.totalElements,
        totalItem: firmwareMng.totalElements,
      },
      searchOption,
    );

    const result = await fotaAPI.getFirmwareList(query);

    if (!isNull(result)) {
      const list = result.data.payload.content;

      onExcelDownload(
        t('word.firmwareManage'),
        makeRowsFormat(list, codes),
        columns,
      );

      setIsLoading(false);
    }

    // console.log('result >> ', result.status);
  }, [columns, firmwareMng.totalElements, searchOption, codes, t]);

  const checkToolbarItem = useCallback(
    (item) => {
      switch (item.type) {
        case 'regist':
          navigate('/fota/firmwareManageDetail', {
            isEdit: false,
          });
          break;
        case 'edit':
          navigate('/fota/firmwareManageDetail', {
            isEdit: true,
          });
          break;
        case 'refresh':
          onRefresh();
          break;
        // case 'delete':
        //   break;
        case 'download':
          excelDownload(item);
          break;
        default:
          break;
      }
      dispatch(getDatagridInfo(null));
    },
    [dispatch, navigate, onRefresh, excelDownload],
  );

  useEffect(() => {
    if (!isNull(toolbarItem)) {
      checkToolbarItem(toolbarItem);
    }

    if (initial) {
      onFetchData();
    }
  }, [onFetchData, initial, firmwareMng, checkToolbarItem, toolbarItem]);

  return (
    <Box>
      <CSearchCondition
        onFetchData={onFetchData}
        conditionList={conditionList}
      />
      <Divider />
      <CDataGrid
        title={t('word.firmwareManage')}
        columns={columns}
        rows={
          !isNull(firmwareMng.list) && makeRowsFormat(firmwareMng.list, codes)
        }
        totalElement={firmwareMng.totalElements}
        param={param}
        onRefresh={onRefresh}
        isLoading={isLoading}
        category={'firmwareManage'}
        onPageSizeChange={(newPageSize) => {
          onFetchData({
            page: param.page,
            size: newPageSize,
          });
        }}
        onPageChange={(newPages) => {
          onFetchData({
            page: newPages,
            size: param.size,
          });
        }}
        // onCellClick={(param) => {
        //   if (category === 'statusSearch' && param.field !== 'editDelete') {
        //     props.rowDetail(param.row);
        //   }
        // }}
        toolbarBtnList={toolbarBtnList}
      />
    </Box>
  );
};

export default FirmwareManage;
