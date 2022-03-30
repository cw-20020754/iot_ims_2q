import * as React from 'react';
import { styled } from '@mui/material/styles';
import { DialogContent, Grid } from '@mui/material';

const CDialogContent = (props) => {
  const { children, dividers, sx, grids, ...rest } = props;

  const CDialogContent = styled(DialogContent)(({ theme }) => ({}));
  const defaultGridCol = 12;

  return (
    <CDialogContent dividers={dividers} sx={sx} {...rest}>
      <Grid container spacing={1} justifyContent="space-between">
        {children.length > 1 ? (
          children.map((child, index) => (
            <Grid
              key={index}
              item
              xs={grids[index] ? grids[index] : defaultGridCol}
            >
              {child}
            </Grid>
          ))
        ) : (
          <Grid item xs>
            {children}
          </Grid>
        )}
      </Grid>
    </CDialogContent>
  );
};

export default CDialogContent;
