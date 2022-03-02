import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardActions } from '@mui/material';
import { TreeView } from '@mui/lab';
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
  } = props;

  const CTree = styled(TreeView)(({ theme }) => ({
    flexGrow: 1,
    overflowY: 'auto',
  }));

  const renderTree = (nodes) =>
    nodes.map((node, index) => (
      <CTreeItem
        key={index}
        nodeId={node.id}
        labelText={node.labelText}
        labelIcon={node.prependIcon}
        labelInfo={node.labelInfo}
      >
        {Array.isArray(node.children) ? renderTree(node.children) : null}
      </CTreeItem>
    ));

  return (
    <Card>
      <CardHeader title="ddd">ddd</CardHeader>
      <CardActions>
        <CTree
          sx={sx}
          selected={selected}
          defaultSelected={defaultSelected}
          defaultCollapseIcon={
            defaultCollapseIcon ? defaultCollapseIcon : <ArrowRightIcon />
          }
          defaultExpandIcon={
            defaultExpandIcon ? defaultExpandIcon : <ArrowDropDownIcon />
          }
          defaultExpanded={defaultExpanded}
          onNodeSelect={(event, nodeIds) => onNodeSelect(event, nodeIds)}
        >
          {treeDataList && treeDataList.length > 0 && renderTree(treeDataList)}
        </CTree>
      </CardActions>
    </Card>
  );
};

export default CTree;
