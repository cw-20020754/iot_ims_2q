import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CSearchCondition from 'components/complex/CSearchCondition';
import CTabs from 'components/basic/CTabs';
import { postComCodeList } from 'redux/reducers/adminMgmt/comCodeMgmt';
import {
  postProtocolFuncList,
  setProtocolFuncParams,
  setConditionSelctList,
  setDataGridTitle,
  setProtocolItem,
  setProtocolValue,
} from 'redux/reducers/iotProtocol/protocolFunc';
import { setSearchConditionParam } from 'redux/reducers/changeStateSlice';
import { isNull } from 'common/utils';
import ProtocolFuncGrid from './ProtocolFuncGrid';
import ProtocolFuncTree from './ProtocolFuncTree';

const ProtocolFunc = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [tabValue, setTabValue] = React.useState('total');

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

  const apiReqDirectionList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '010',
      )[0]?.codeList,
    shallowEqual,
  );

  const itemNmList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '005',
      )[0]?.codeList,
    shallowEqual,
  );

  const valueNmList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '006',
      )[0]?.codeList,
    shallowEqual,
  );

  const itemTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '009',
      )[0]?.codeList,
    shallowEqual,
  );

  const directionList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '011',
      )[0]?.codeList,
    shallowEqual,
  );

  const conditionList = useSelector(
    (state) => state.protocolFunc.conditionList,
    shallowEqual,
  );

  // 정수기, MQTT Only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultProtocolFuncParams = {
    prodTypeCode: '02',
    typeCode: '0003',
    groupCode: '',
  };

  const protocolFuncParams = useSelector(
    (state) => state.protocolFunc.protocolFuncParams,
    shallowEqual,
  );

  const handleClickSearch = async (searchConditionParams) => {
    if (searchConditionParams) {
      fetchProtocolFuncParams(searchConditionParams);
      const prodTypeCodeNm = prodTypeList.filter(
        (item) => item.value === searchConditionParams['prodTypeCode'],
      )[0].text;
      const typeCodeNm = protocolTypeList.filter(
        (item) => item.value === searchConditionParams['typeCode'],
      )[0].text;
      fetchDataGridTitle(`${prodTypeCodeNm} / ${typeCodeNm}`);
    }
  };

  const handleTabChange = async (value, text) => {
    setTabValue(value);
    fetchProtocolFuncParams({
      groupCode: value,
    });

    const name = 'groupCode';
    await dispatch(setSearchConditionParam({ name, value }));
    await dispatch(
      setProtocolItem({
        itemSeq: 0,
        prodTypeCode: protocolFuncParams.prodTypeCode,
        typeCode: protocolFuncParams.typeCode,
        groupCode: value,
        itemTypeCode: '',
        itemId: '',
        itemCode: '',
        length: 0,
        itemAttrNm: '',
        itemDesc: '',
        cnt: 0,
      }),
    );
    await dispatch(
      setProtocolValue({
        itemSeq: 0,
        valueSeq: 0,
        prodTypeCode: protocolFuncParams.prodTypeCode,
        typeCode: protocolFuncParams.typeCode,
        groupCode: value,
        itemId: '',
        itemCode: '',
        valueId: '',
        valueCode: '',
        valueDirectionCode: '',
        valueDesc: '',
      }),
    );
  };

  const fetchProtocolFuncParams = useCallback(
    async (params) => {
      await dispatch(setProtocolFuncParams(params));
    },
    [dispatch],
  );

  const fetchConditionSelectList = useCallback(async () => {
    await dispatch(
      setConditionSelctList({
        protocolTypeList,
        prodTypeList,
        protocolGroupList,
        apiReqDirectionList,
      }),
    );
  }, [
    dispatch,
    protocolTypeList,
    prodTypeList,
    protocolGroupList,
    apiReqDirectionList,
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
   * 004 : 제품 유형
   * 010 : API 요청방향
   * 005 : 기능 이름
   * 009 : 기능 유형
   * 006 : Value 이름
   * 011 : Value 방향
   */
  const fetchComCodeList = useCallback(async () => {
    await dispatch(
      postComCodeList({
        groupIdList: ['001', '002', '004', '005', '006', '009', '010', '011'],
      }),
    );
  }, [dispatch]);

  const fetchProtocolFuncData = useCallback(async () => {
    await dispatch(postProtocolFuncList(protocolFuncParams));
  }, [dispatch, protocolFuncParams]);

  useEffect(() => {
    if (!isNull(protocolFuncParams.prodTypeCode) && tabValue === 'total') {
      fetchProtocolFuncData();
    }
  }, [fetchProtocolFuncData, protocolFuncParams, tabValue]);

  useEffect(() => {
    fetchConditionSelectList();
  }, [fetchConditionSelectList]);

  useEffect(() => {
    if (
      !protocolTypeList ||
      !prodTypeList ||
      !protocolGroupList ||
      !apiReqDirectionList ||
      !itemNmList ||
      !valueNmList ||
      !itemTypeList ||
      !directionList
    ) {
      fetchComCodeList();
      fetchProtocolFuncParams(defaultProtocolFuncParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {protocolTypeList?.length > 0 && (
        <CSearchCondition
          onClickSearch={handleClickSearch}
          conditionList={conditionList}
          defaultValues={defaultProtocolFuncParams}
        />
      )}
      {protocolGroupList?.length > 0 && (
        <CTabs
          tabDataList={[{ value: 'total', text: t('word.total') }].concat(
            protocolGroupList,
          )}
          onChange={(value, text) =>
            handleTabChange(value === 'total' ? '' : value, text)
          }
        >
          {[{ value: 'total', text: t('word.total') }]
            .concat(protocolGroupList)
            .map((panel, index) => {
              if (panel.value === 'total') {
                return (
                  <ProtocolFuncGrid
                    key={index}
                    defaultProtocolItemParams={defaultProtocolFuncParams}
                  />
                );
              } else {
                return <ProtocolFuncTree key={index} />;
              }
            })}
        </CTabs>
      )}
    </>
  );
};

export default ProtocolFunc;
