import * as React from 'react';
import { styled } from '@mui/material/styles';
import { DialogContent, Grid } from '@mui/material';

const CDialogContent = (props) => {
  const { children, dividers, sx, grids } = props;

  const CDialogContent = styled(DialogContent)(({ theme }) => ({}));

  const calcGridCols = () => {
    const defaultGridCol = 12;

    if (children.length === grids.length) {
      return grids;
    } else {
      const index = children.length - grids.length;

      return grids.fill(index - 1, defaultGridCol);
    }
  };

  const gridCols = calcGridCols();

  return (
    <CDialogContent dividers={dividers} sx={sx}>
      <Grid container spacing={1} justifyContent="space-between">
        {children.length > 1 ? (
          children.map((child, index) => (
            <Grid key={index} item xs={gridCols[index]}>
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
