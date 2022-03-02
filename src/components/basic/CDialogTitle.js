import * as React from 'react';
import { styled } from '@mui/material/styles';
import { DialogTitle, Grid } from '@mui/material';

const CDialogTitle = (props) => {
  const { sx, title, children } = props;

  const CDialogTitle = styled(DialogTitle)(({ theme }) => ({
    fontWeight: 500,
    fontSize: 20,
    paddingRight: 8,
  }));

  return (
    <CDialogTitle sx={sx}>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item xs>
          {title}
        </Grid>
        {children && children.length > 1 ? (
          children.map((child, index) => (
            <Grid key={index} item xs="auto">
              {child}
            </Grid>
          ))
        ) : (
          <Grid item xs="auto">
            {children}
          </Grid>
        )}
      </Grid>
    </CDialogTitle>
  );
};

export default CDialogTitle;
