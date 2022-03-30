import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CButton from 'components/basic/CButton';
import CTree from 'components/basic/CTree';
import {
  getComCodeGroup,
  setComCodeParams,
  postComCodeListForTree,
} from 'redux/reducers/adminMgmt/comCodeMgmt';

const ComCodeMgmtTree = (props) => {
  const { onComCodeDialogOpen } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [expanded, setExpanded] = React.useState([]);

  const treeDataList = useSelector(
    (state) => state.comCodeMgmt.treeDataList,
    shallowEqual,
  );

  const handleNodeSelect = useCallback(
    (event, nodeIds) => {
      dispatch(setComCodeParams({ page: 0, groupId: nodeIds }));
    },
    [dispatch],
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
    setExpanded(nodeIds);
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
      treeDataList={treeDataList}
      onNodeSelect={handleNodeSelect}
      onNodeButtonClick={(e, type, id, name) => {
        e.stopPropagation();
        onComCodeDialogOpen({
          type: type === 'edit' ? 'mdfGroup' : 'delGroup',
          params: { groupId: id, groupNm: name },
        });
      }}
      onNodeToggle={handleNodeToggle}
      expanded={expanded}
      headerChildren={
        <>
          <IconButton onClick={() => fetchComCodeGroupData()}>
            <AutorenewIcon />
          </IconButton>
          <CButton onClick={() => onComCodeDialogOpen({ type: 'addGroup' })}>
            {t('word.group') + ' ' + t('word.add')}
          </CButton>
        </>
      }
    ></CTree>
  );
};

export default ComCodeMgmtTree;
