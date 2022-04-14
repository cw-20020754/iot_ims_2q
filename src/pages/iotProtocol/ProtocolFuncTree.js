import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CTree from 'components/basic/CTree';
import {
  postProtocolItemList,
  getProtocolValueList,
  getProtocolItem,
  getProtocolValue,
  setProtocolItem,
  setProtocolValue,
} from 'redux/reducers/iotProtocol/protocolFunc';
import ProtocolFuncForm from './ProtocolFuncForm';
import { isNull } from 'common/utils';

const ProtocolFuncTree = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const dialogInfo = useSelector(
    (state) => state.protocolFunc.dialogInfo,
    shallowEqual,
  );

  const openDialog = useSelector(
    (state) => state.protocolFunc.openDialog,
    shallowEqual,
  );

  const [expanded, setExpanded] = React.useState([]);
  const [formType, setFormType] = React.useState('item');
  const [protocolItemParams, setProtocolItemParams] = React.useState({
    itemSeq: '',
  });
  const [protocolValueParams, setProtocolValueParams] = React.useState({
    itemSeq: '',
    valueSeq: '',
  });

  const protocolFuncParams = useSelector(
    (state) => state.protocolFunc.protocolFuncParams,
    shallowEqual,
  );

  const treeDataList = useSelector(
    (state) => state.protocolFunc.treeDataList,
    shallowEqual,
  );

  const handleNodeSelect = useCallback(
    async (e, nodeIds) => {
      if (nodeIds.indexOf('|') !== -1) {
        const nodeId = nodeIds.split('|');
        setFormType('value');
        setProtocolValueParams({
          itemSeq: nodeId[0],
          valueSeq: nodeId[1],
        });
        await dispatch(
          setProtocolValue({
            itemSeq: nodeId[0],
            valueSeq: nodeId[1],
          }),
        );
      } else {
        setFormType('item');
        setProtocolItemParams({
          itemSeq: nodeIds,
        });
        await dispatch(
          setProtocolItem({
            itemSeq: nodeIds,
            cnt: Number(
              treeDataList.filter((data) => data.id === nodeIds)[0]?.labelInfo,
            ),
          }),
        );
      }
    },
    [dispatch, treeDataList],
  );

  const handleNodeToggle = (nodeIds, e) => {
    if (
      nodeIds &&
      nodeIds.length > 0 &&
      treeDataList.some(
        (item) => item.id === nodeIds[0] && item.children.length < 2,
      )
    ) {
      fetchProtocolValueList(nodeIds[0]);
    }
    setExpanded([nodeIds[0]]);
  };

  const handleSubmit = () => {
    fetchProtocolItemList();
    expanded.length > 0 && fetchProtocolValueList(expanded[0]);
  };

  const handleFormTypeChange = (value) => {
    setFormType(value);
  };

  const fetchGetProtocolItem = useCallback(async () => {
    await dispatch(getProtocolItem(protocolItemParams));
  }, [dispatch, protocolItemParams]);

  const fetchGetProtocolValue = useCallback(async () => {
    await dispatch(getProtocolValue(protocolValueParams));
  }, [dispatch, protocolValueParams]);

  const fetchProtocolItemList = useCallback(async () => {
    await dispatch(postProtocolItemList(protocolFuncParams));
  }, [dispatch, protocolFuncParams]);

  const fetchProtocolValueList = useCallback(
    async (nodeId) => {
      await dispatch(
        getProtocolValueList({
          itemSeq: nodeId,
          valueNm: protocolFuncParams.valueNm,
        }),
      );
    },
    [dispatch, protocolFuncParams.valueNm],
  );

  useEffect(() => {
    if (!isNull(protocolValueParams.itemSeq)) {
      fetchGetProtocolValue();
    }
  }, [fetchGetProtocolValue, protocolValueParams.itemSeq]);

  useEffect(() => {
    if (!isNull(protocolItemParams.itemSeq)) {
      fetchGetProtocolItem();
    }
  }, [fetchGetProtocolItem, protocolItemParams]);

  useEffect(() => {
    fetchProtocolItemList();
  }, [fetchProtocolItemList, protocolFuncParams]);

  useEffect(() => {
    fetchProtocolItemList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        rowSpacing={1}
        columnSpacing={1}
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Grid item xs={4}>
          <CTree
            treeDataList={treeDataList}
            onNodeSelect={handleNodeSelect}
            onNodeToggle={handleNodeToggle}
            expanded={expanded}
          ></CTree>
        </Grid>
        <Grid item xs={8}>
          <ProtocolFuncForm
            formType={formType}
            onSubmit={handleSubmit}
            onFormTypeChnage={handleFormTypeChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProtocolFuncTree;
