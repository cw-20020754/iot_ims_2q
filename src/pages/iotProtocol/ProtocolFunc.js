import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CSearchCondition from 'components/complex/CSearchCondition';
import CTabs from 'components/basic/CTabs';
import { postComCodeList } from 'redux/reducers/adminMgmt/comCodeMgmt';
import {
  postProtocolItemList,
  setProtocolItemParams,
  setConditionSelctList,
  setDataGridTitle,
} from 'redux/reducers/iotProtocol/protocolFunc';
import { isNull } from 'common/utils';
import ProtocolFuncGrid from './ProtocolFuncGrid';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActions,
  IconButton,
  Box,
} from '@mui/material';

const ProtocolFunc = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const protocolTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '002',
      )[0]?.codeList,
    shallowEqual,
  );

  const prodTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '004',
      )[0]?.codeList,
    shallowEqual,
  );

  const protocolGroupList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '001',
      )[0]?.codeList,
    shallowEqual,
  );

  const apiReqDerectionList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '010',
      )[0]?.codeList,
    shallowEqual,
  );

  const conditionList = useSelector(
    (state) => state.protocolFunc.conditionList,
    shallowEqual,
  );

  // 정수기, MQTT Only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultProtocolItemParams = {
    prodTypeCode: '02',
    typeCode: '0003',
  };

  const protocolItemParams = useSelector(
    (state) => state.protocolFunc.protocolItemParams,
    shallowEqual,
  );

  const loading = useSelector(
    (state) => state.protocolFunc.loading,
    shallowEqual,
  );

  const dataGridTitle = useSelector(
    (state) => state.protocolFunc.dataGridTitle,
    shallowEqual,
  );

  const protocolItemList = useSelector(
    (state) => state.protocolFunc.protocolItemList,
    shallowEqual,
  );

  const totalElements = useSelector(
    (state) => state.protocolFunc.totalElements,
    shallowEqual,
  );

  const handleClickSearch = async (searchConditionParams) => {
    if (searchConditionParams) {
      fetchProtocolItemParams({
        prodTypeCode: searchConditionParams['prodTypeCode'] || '',
        typeCode: searchConditionParams['typeCode'] || '',
      });
      const prodTypeCodeNm = prodTypeList.filter(
        (item) => item.value === searchConditionParams['prodTypeCode'],
      )[0].text;
      const typeCodeNm = protocolTypeList.filter(
        (item) => item.value === searchConditionParams['typeCode'],
      )[0].text;
      fetchDataGridTitle(`${prodTypeCodeNm} / ${typeCodeNm}`);
    }
  };

  const fetchProtocolItemParams = useCallback(
    async (params) => {
      await dispatch(setProtocolItemParams(params));
    },
    [dispatch],
  );

  const fetchProtocolItemData = useCallback(async () => {
    await dispatch(postProtocolItemList(protocolItemParams));
  }, [dispatch, protocolItemParams]);

  const fetchConditionSelectList = useCallback(async () => {
    await dispatch(
      setConditionSelctList({
        protocolTypeList,
        prodTypeList,
        protocolGroupList,
        apiReqDerectionList,
      }),
    );
  }, [
    dispatch,
    protocolTypeList,
    prodTypeList,
    protocolGroupList,
    apiReqDerectionList,
  ]);

  const fetchDataGridTitle = useCallback(
    async (title) => {
      await dispatch(setDataGridTitle(title));
    },
    [dispatch],
  );

  /**
   * 001 : 프로토콜 그룹
   * 002 : 프로토콜 유형
   * 003 : API 이름
   * 004 : 제품 유형
   * 010 : API 요청방향
   */
  const fetchComCodeList = useCallback(async () => {
    await dispatch(
      postComCodeList({ groupIdList: ['001', '002', '003', '004', '010'] }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (!isNull(protocolItemParams.prodTypeCode)) {
      fetchProtocolItemData();
    }
  }, [fetchProtocolItemData, protocolItemParams]);

  useEffect(() => {
    fetchConditionSelectList();
  }, [fetchConditionSelectList]);

  useEffect(() => {
    if (!protocolTypeList || !prodTypeList) {
      fetchComCodeList();
      fetchProtocolItemParams(defaultProtocolItemParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {protocolTypeList?.length > 0 && (
        <CSearchCondition
          onClickSearch={handleClickSearch}
          conditionList={conditionList}
          defaultValues={defaultProtocolItemParams}
        />
      )}
      {protocolGroupList?.length > 0 && (
        <CTabs
          tabDataList={[{ value: 'total', text: t('word.total') }].concat(
            protocolGroupList,
          )}
        >
          <ProtocolFuncGrid
            defaultProtocolItemParams={defaultProtocolItemParams}
          />
          <Typography variant="h4">panel1</Typography>
          <Typography variant="h4">panel2</Typography>
        </CTabs>
      )}
    </>
  );
};

export default ProtocolFunc;
