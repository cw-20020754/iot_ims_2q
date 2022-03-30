import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton } from '@mui/material';
import TreeItem from '@mui/lab/TreeItem';

const CTreeItem = React.forwardRef((props, ref) => {
  const {
    id,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    appendIconButtons,
    onNodeButtonClick,
    ...other
  } = props;

  const CTreeItem = styled(TreeItem)(({ theme }) => ({
    '& .MuiTreeItem-content': {
      padding: 0,
    },
    '& .MuiTreeItem-content .MuiTreeItem-iconContainer svg': {
      fontSize: 'xx-large',
    },
  }));

  return (
    <CTreeItem
      ref={ref}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body1"
            sx={{ fontWeight: 'inherit', flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="body1" color="inherit" sx={{ mr: 1 }}>
            {labelInfo}
          </Typography>
          {appendIconButtons && appendIconButtons.length > 0
            ? appendIconButtons.map((item) => (
                <IconButton
                  key={item.type}
                  sx={{ px: 0 }}
                  disabled={item.disabled}
                  onClick={(e) => {
                    onNodeButtonClick(e, item.type, id, labelText);
                  }}
                >
                  <Box
                    key={item.type}
                    component={item.icon}
                    sx={{ px: 0.5, fontSize: 'x-large' }}
                    color="inherit"
                  />
                </IconButton>
              ))
            : null}
        </Box>
      }
      {...other}
    ></CTreeItem>
  );
});

CTreeItem.displayName = 'CTreeItem';

export default CTreeItem;
