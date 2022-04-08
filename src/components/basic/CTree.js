import React, { useCallback } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Card, CardActions, Divider, Typography } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CTreeItem from './CTreeItem';

const CTree = (props) => {
  const {
    treeDataList,
    sx,
    children,
    selected,
    onNodeToggle,
    onNodeSelect,
    defaultSelected,
    defaultCollapseIcon,
    defaultExpandIcon,
    defaultExpanded,
    onNodeButtonClick,
    headerChildren,
    height,
    expanded,
    ...other
  } = props;

  const theme = useTheme();

  const CTree = styled(TreeView)(({ theme }) => ({
    flexGrow: 1,
    height: height ? height : 500,
    overflow: 'auto',
  }));

  const handleChange = (e, nodeIds) => {
    let iconClicked = e.target.closest('.MuiTreeItem-iconContainer');
    if (iconClicked) {
      return onNodeToggle(nodeIds);
    }
  };

  const renderTree = (nodes) =>
    nodes.map((node, index) => (
      <CTreeItem
        key={index}
        nodeId={node.id}
        id={node.id}
        labelText={node.labelText}
        labelIcon={node.prependIcon}
        labelInfo={node.labelInfo}
        appendIconButtons={node.appendIconButtons}
        onNodeButtonClick={onNodeButtonClick}
      >
        {Array.isArray(node.children) ? renderTree(node.children) : null}
      </CTreeItem>
    ));

  return (
    <Card sx={{ width: 1 }}>
      <CardActions
        sx={{ justifyContent: 'space-between', display: 'flex', py: 1, px: 2 }}
      >
        {headerChildren}
      </CardActions>
      <Divider
        variant="middle"
        sx={{ borderBottomWidth: 2, borderColor: theme.palette.primary.black }}
      />

      <CardActions sx={{ pt: 0 }}>
        {treeDataList.length === 0 && (
          <Typography variant={'h3'}>No Data</Typography>
        )}
        <CTree
          sx={sx}
          selected={selected}
          defaultSelected={defaultSelected}
          defaultCollapseIcon={
            defaultCollapseIcon ? defaultCollapseIcon : <ArrowDropDownIcon />
          }
          defaultExpandIcon={
            defaultExpandIcon ? defaultExpandIcon : <ArrowRightIcon />
          }
          onNodeSelect={(e, nodeIds) => onNodeSelect(e, nodeIds)}
          expanded={expanded}
          onNodeToggle={handleChange}
          {...other}
        >
          {/* TODO... transition 방법 찾아 적용  */}
          {treeDataList && treeDataList.length > 0 && renderTree(treeDataList)}
        </CTree>
      </CardActions>
    </Card>
  );
};

export default CTree;
