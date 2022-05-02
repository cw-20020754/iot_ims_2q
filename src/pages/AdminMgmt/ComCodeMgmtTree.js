import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconButton, Paper } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CButton from 'components/basic/CButton';
import CTree from 'components/basic/CTree';
import CInput from 'components/basic/CInput';
import {
  getComCodeGroup,
  setComCodeParams,
  postComCodeListForTree,
  setDataGridTitle,
  setTreeExpanded,
} from 'redux/reducers/adminMgmt/comCodeMgmt';
import { setSearchConditionParam } from 'redux/reducers/common/sharedInfo';

const ComCodeMgmtTree = (props) => {
  const { onComCodeDialogOpen } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [filter, setFilter] = React.useState('');

  const treeExpanded = useSelector(
    (state) => state.comCodeMgmt.treeExpanded,
    shallowEqual,
  );

  const treeDataList = useSelector(
    (state) => state.comCodeMgmt.treeDataList,
    shallowEqual,
  );

  const handleNodeSelect = useCallback(
    async (e, nodeIds) => {
      const name = 'codeId';
      let value = '';
      let groupNm = '';
      if (nodeIds.indexOf('|') !== -1) {
        const nodeId = nodeIds.split('|');
        groupNm = treeDataList.filter((data) => data.id === nodeId[0])[0]
          ?.labelText;

        await dispatch(
          setComCodeParams({
            page: 0,
            groupId: nodeId[0],
            code: nodeId[1],
            langCode: treeDataList
              .filter((data) => data.id === nodeId[0])[0]
              .children.filter((child) => child.id === nodeIds)[0]?.labelInfo,
            groupNm: groupNm,
          }),
        );
        value = nodeId[1];
      } else {
        groupNm = treeDataList.filter((data) => data.id === nodeIds)[0]
          ?.labelText;

        await dispatch(
          setComCodeParams({
            page: 0,
            groupId: nodeIds,
            groupNm: groupNm,
            code: '',
            codeNm: '',
          }),
        );
      }
      dispatch(setDataGridTitle(groupNm));
      await dispatch(setSearchConditionParam({ name, value }));
    },
    [dispatch, treeDataList],
  );

  const handleNodeToggle = async (nodeIds) => {
    if (
      nodeIds &&
      nodeIds.length > 0 &&
      treeDataList.some(
        (item) => item.id === nodeIds[0] && item.children.length < 2,
      )
    ) {
      await fetchComCodeGroupChildren(nodeIds);
    }
    dispatch(setTreeExpanded(nodeIds));
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const fetchComCodeGroupData = useCallback(async () => {
    await dispatch(getComCodeGroup());
  }, [dispatch]);

  const fetchComCodeGroupChildren = useCallback(
    async (nodeIds) => {
      await dispatch(postComCodeListForTree({ groupIdList: nodeIds }));
    },
    [dispatch],
  );

  useEffect(() => {
    fetchComCodeGroupData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CTree
      treeDataList={treeDataList.filter((data) =>
        data.labelText.includes(filter),
      )}
      onNodeSelect={handleNodeSelect}
      onNodeButtonClick={(e, type, id, name) => {
        e.stopPropagation();
        onComCodeDialogOpen({
          type: type === 'edit' ? 'mdfGroup' : 'delGroup',
          params: { groupId: id, groupNm: name },
        });
      }}
      onNodeToggle={handleNodeToggle}
      expanded={treeExpanded}
      headerChildren={
        <>
          <Paper
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '80%',
            }}
          >
            <CInput
              sx={{ ml: 1, flex: 1 }}
              placeholder={t('word.search')}
              onChange={(e) => handleFilterChange(e.target.value)}
            />
            <IconButton onClick={() => fetchComCodeGroupData()}>
              <AutorenewIcon />
            </IconButton>
          </Paper>
          <CButton
            sx={{ width: '90px' }}
            onClick={() =>
              onComCodeDialogOpen({
                type: 'addGroup',
                params: { groupId: '', groupNm: '' },
              })
            }
          >
            {t('word.group') + ' ' + t('word.add')}
          </CButton>
        </>
      }
    ></CTree>
  );
};

export default ComCodeMgmtTree;
