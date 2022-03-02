import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton } from '@mui/material';
import TreeItem from '@mui/lab/TreeItem';
import Label from '@mui/icons-material/Label';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CTreeItem = (props) => {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    prependButtons,
    ...other
  } = props;

  const CTreeItem = styled(TreeItem)(({ theme }) => ({
    '& .MuiTreeItem-content .MuiTreeItem-iconContainer svg': {
      fontSize: 'xx-large',
    },
  }));

  return (
    <CTreeItem
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 'inherit', flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
};

export default CTreeItem;
