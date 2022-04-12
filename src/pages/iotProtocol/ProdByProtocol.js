import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import CSearchCondition from 'components/complex/CSearchCondition';
import { useTranslation } from 'react-i18next';
import CTabs from 'components/basic/CTabs';
import CDataGrid from 'components/complex/Table/CDataGrid';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  getChangeProtocolByProduct,
  getProtocolByProduct,
  setColumnVisibilityModel,
  setConditionSelctList,
  setDataGridTitle,
  setTabDataList,
} from 'redux/reducers/iotProtocolSlice';
import { fileDownload, isNull, makeQuery } from 'common/utils';
import {
  getDevModelCode,
  GlobalLoading,
} from 'redux/reducers/changeStateSlice';
import { postComCodeList } from 'redux/reducers/adminMgmt/comCodeMgmt';
import { GROUP_ID, HTTP_STATUS } from 'common/constants';
import { prodByProtocolAPI } from 'api';
import ProdChangeProtocolDialog from './ProdChangeProtocolDialog';

const ProdByProtocol = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [groupCode, setGroupCode] = useState('');
  const [searchCondition, setSearchCondition] = useState(null);

  const defaultProtocolApiParams = {
    prodTypeCode: '02',
    typeCode: '0003',
  };
  const { tabDataList } = useSelector((state) => state.iotProtocol);

  const conditionList = useSelector(
    (state) => state.iotProtocol.conditionList,
    shallowEqual,
  );
  // 기기모델코드
  const devModelCodeList = useSelector(
    (state) => state.changeState.devModelCodeList,
    shallowEqual,
  );

  // 제품 유형
  const prodTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.PROD_TYPE,
      ),
    shallowEqual,
  )[0]?.codeList;
  // 프로토콜 그룹
  const protocolGroupList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.PROTOCOL_GROUP,
      ),
    shallowEqual,
  )[0]?.codeList;

  const protocolTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.PROTOCOL_TYPE,
      ),
    shallowEqual, // 프로토콜 유형
  )[0]?.codeList;

  const columnVisibilityModel = useSelector(
    (state) => state.iotProtocol.columnVisibilityModel,
    shallowEqual,
  );

  const searchConditionParams = useSelector(
    (state) => state.changeState.searchConditionParams,
    shallowEqual,
  );

  const dataGridTitle = useSelector(
    (state) => state.iotProtocol.dataGridTitle,
    shallowEqual,
  );

  /**
   * Dialog variables
   */
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    type: '',
    params: {},
    devModelCode: '',
  });

  const dialogClose = useCallback(() => {
    setOpenDialog(false);
  }, []);

  // 제품 프로토콜 변경 버튼 클릭
  const onTitleButtonClick = async (id) => {
    dispatch(GlobalLoading(true));

    setDialogInfo((prevState) => ({
      ...prevState,
      defaultValue: { devModelCode: '', desc: '' },
      searchCondition: searchCondition,
      devModelCode: devModelCodeList.filter(
        (v) => v.devModelCode !== searchConditionParams.devModelCode,
      ),
    }));

    await dispatch(
      getChangeProtocolByProduct({
        param: makeQuery(searchCondition),
      }),
    );

    setOpenDialog(true);
    dispatch(GlobalLoading(false));
  };

  /**
   * Grid variables
   */

  const dataGridColums = useSelector(
    (state) => state.iotProtocol.dataGridColums,
    shallowEqual,
  );

  const loading = useSelector(
    (state) => state.iotProtocol.loading,
    shallowEqual,
  );

  const dataGridTitleButtons = [
    {
      id: 'protocolChangeButton',
      text: t('word.prod') + ' ' + t('word.protocol') + ' ' + t('word.change'),
      disabled:
        isNull(searchCondition) ||
        isNull(searchCondition.devModelCode) ||
        isNull(searchCondition.prodTypeCode) ||
        isNull(searchCondition.typeCode),
      onTitleButtonClick: onTitleButtonClick,
    },
  ];

  const fetchProtocolData = useCallback(
    async (params) => {
      await dispatch(getProtocolByProduct(params));
    },
    [dispatch],
  );

  const fetchDevModeCodeList = useCallback(async () => {
    // console.log(searchConditionParams);
    setSearchCondition(searchConditionParams);
    await dispatch(getDevModelCode(searchConditionParams));
  }, [dispatch, searchConditionParams]);

  const fetchComCodeList = useCallback(async () => {
    await dispatch(
      postComCodeList({
        groupIdList: [
          GROUP_ID.PROTOCOL_GROUP,
          GROUP_ID.PROTOCOL_TYPE,
          GROUP_ID.PROD_TYPE,
        ],
      }),
    );
    await fetchDevModeCodeList();
  }, [dispatch, fetchDevModeCodeList]);

  const fetchConditionSelectList = useCallback(async () => {
    await dispatch(
      setConditionSelctList({
        protocolTypeList,
        prodTypeList,
        devModelCodeList,
      }),
    );
  }, [dispatch, protocolTypeList, prodTypeList, devModelCodeList]);

  const fetchDataGridTitle = useCallback(
    async (title) => {
      await dispatch(setDataGridTitle(title));
    },
    [dispatch],
  );
  const fetchTabDataList = useCallback(
    async (groupList) => {
      await dispatch(setTabDataList(groupList));
    },
    [dispatch],
  );

  useEffect(() => {
    fetchConditionSelectList();

    if (tabDataList && tabDataList.length === 0 && protocolGroupList) {
      fetchTabDataList(protocolGroupList);
    }

    if (
      searchConditionParams['prodTypeCode'] &&
      searchConditionParams['typeCode'] &&
      searchConditionParams !== searchCondition
    ) {
      fetchDevModeCodeList();
    }
  }, [
    searchConditionParams,
    searchCondition,
    devModelCodeList,
    fetchDevModeCodeList,
    fetchConditionSelectList,
    tabDataList,
    protocolGroupList,
    fetchTabDataList,
  ]);

  useEffect(() => {
    if (!protocolTypeList || !prodTypeList) {
      fetchComCodeList();
    }

    // 타이틀, 제품 상태
    return () => {
      fetchDataGridTitle('');
      fetchTabDataList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setprodByProtocolTitle = (label) => {
    if (
      !isNull(searchConditionParams['prodTypeCode']) &&
      !isNull(searchConditionParams['typeCode']) &&
      !isNull(searchConditionParams['devModelCode'])
    ) {
      const prodTypeCodeNm = prodTypeList.filter(
        (item) => item.value === searchCondition['prodTypeCode'],
      )[0].text;
      const typeCodeNm = protocolTypeList.filter(
        (item) => item.value === searchCondition['typeCode'],
      )[0].text;

      const devModelCodeNm = devModelCodeList.filter(
        (item) => item.devModelCode === searchCondition['devModelCode'],
      )[0].desc;

      fetchDataGridTitle(
        `${label} / ${prodTypeCodeNm} / ${typeCodeNm} / ${devModelCodeNm}`,
      );
    } else {
      fetchDataGridTitle(`${label}`);
    }
  };

  /**
   * Event Handler
   */
  const onClickTab = (value) => {
    let label = tabDataList?.find((v) => v.value === value).text;

    setGroupCode(value);
    setprodByProtocolTitle(label);
  };

  const handleClickSearch = async (searchCondition) => {
    if (searchCondition && Object.keys(searchCondition).length !== 0) {
      setSearchCondition(searchCondition);

      setDialogInfo((prevState) => ({
        ...prevState,
        searchCondition: searchCondition,
        devModelCode: devModelCodeList.find(
          (v) => v.devModelCode === searchCondition.devModelCode,
        ),
      }));

      if (!isNull(searchCondition.devModelCode)) {
        await fetchProtocolData({
          ...searchCondition,
        });
      }

      let label = tabDataList?.find((v) => v.value === groupCode).text;
      setprodByProtocolTitle(label);
    }
  };

  const handleExportButtonClick = async () => {
    if (searchCondition && Object.keys(searchCondition).length !== 0) {
      dispatch(GlobalLoading(true));

      const exportParams = {
        ...searchCondition,
        groupCode: groupCode,
        columns: Object.entries(columnVisibilityModel)
          .filter((col) => col[1])
          .map((col) => col[0]),
      };

      const result = await prodByProtocolAPI.postProdByProtocolExport(
        exportParams,
      );

      if (result.status === HTTP_STATUS.SUCCESS) {
        fileDownload(result);
      }

      dispatch(GlobalLoading(false));
    }
  };

  const handleColumnVisibilityModelChange = async (newModel) => {
    await dispatch(setColumnVisibilityModel(newModel));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {protocolTypeList?.length > 0 && (
          <CSearchCondition
            onClickSearch={handleClickSearch}
            conditionList={conditionList}
            expanded={true}
            defaultValues={defaultProtocolApiParams}
            autoClear
          />
        )}
        <Grid sx={{ mt: 1 }}>
          {tabDataList?.length > 0 && (
            <CTabs
              sx={{
                width: '100%',
                padding: 2,
              }}
              orientation={'vertical'}
              tabDataList={tabDataList}
              onChange={onClickTab}
            >
              {!isNull(tabDataList) &&
                tabDataList.map((item) => {
                  return (
                    <CDataGrid
                      key={item.value}
                      height={600}
                      title={dataGridTitle}
                      titleButtons={dataGridTitleButtons}
                      columns={dataGridColums}
                      rows={item.list || []}
                      totalElement={item.total || 0}
                      isLoading={loading}
                      columnsButton={true}
                      columnVisibilityModel={columnVisibilityModel}
                      onColumnVisibilityModelChange={(newModel) =>
                        handleColumnVisibilityModelChange(newModel)
                      }
                      exportButton={true}
                      onExportButtonClick={handleExportButtonClick}
                    />
                  );
                })}
            </CTabs>
          )}
        </Grid>
      </Grid>
      <ProdChangeProtocolDialog
        open={openDialog}
        onClose={dialogClose}
        maxWidth={'lg'}
        dialogInfo={dialogInfo}
      />
    </Grid>
  );
};

export default React.memo(ProdByProtocol);
