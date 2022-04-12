import * as React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import TreeItem from '@mui/lab/TreeItem';
import { makeStyles } from '@mui/styles';

const CTreeItem = React.forwardRef((props, ref) => {
  const {
    id,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    appendIconButtons,
    onNodeButtonClick,
    labelComponent,
    ...other
  } = props;

  const useStyles = makeStyles({
    content: {
      padding: 0,
      '& .MuiTreeItem-iconContainer svg': {
        fontSize: labelComponent ? 'normal' : 'xx-large',
      },
    },
  });

  const classes = useStyles();

  return (
    <TreeItem
      ref={ref}
      className={classes.content}
      label={
        labelComponent ? (
          labelComponent
        ) : (
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
        )
      }
      {...other}
    />
  );
});

CTreeItem.displayName = 'CTreeItem';

export default React.memo(CTreeItem);
