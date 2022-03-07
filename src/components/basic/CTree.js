import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardActions, Collapse } from '@mui/material';
import { TreeView } from '@mui/lab';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CTreeItem from './CTreeItem';
import { TransitionGroup } from 'react-transition-group';

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
    ...other
  } = props;

  const CTree = styled(TreeView)(({ theme }) => ({
    flexGrow: 1,
    overflowY: 'auto',
  }));

  const [expanded, setExpanded] = React.useState(
    defaultExpanded ? defaultExpanded : [],
  );

  const handleChange = (event, nodeIds) => {
    event.persist();
    let iconClicked = event.target.closest('.MuiTreeItem-iconContainer');
    if (iconClicked) {
      setExpanded(nodeIds);
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
      >
        {Array.isArray(node.children) ? renderTree(node.children) : null}
      </CTreeItem>
    ));

  return (
    <Card>
      <CardActions
        sx={{ justifyContent: 'space-between', display: 'flex', py: 1 }}
      >
        {headerChildren}
      </CardActions>
      <CardActions sx={{ pt: 0 }}>
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
          onNodeSelect={(event, nodeIds) => onNodeSelect(event, nodeIds)}
          expanded={expanded}
          onNodeToggle={handleChange}
        >
          {/* 닫힐때 transition 에러 원인 파악 필요. */}
          <TransitionGroup>
            {treeDataList &&
              treeDataList.length > 0 &&
              renderTree(treeDataList)}
          </TransitionGroup>
        </CTree>
      </CardActions>
    </Card>
  );
};

export default CTree;
