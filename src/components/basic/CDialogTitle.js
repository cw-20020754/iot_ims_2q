import * as React from 'react';
import { styled } from '@mui/material/styles';
import { DialogTitle, Grid, Box } from '@mui/material';

const CDialogTitle = (props) => {
  const { sx, prependIcon: LabelIcon, title, children } = props;

  const CDialogTitle = styled(DialogTitle)(({ theme }) => ({
    fontWeight: 500,
    fontSize: 20,
    paddingRight: 8,
  }));

  return (
    <CDialogTitle sx={sx}>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item xs sx={{ alignItems: 'center' }}>
          {LabelIcon && (
            <Box
              component={LabelIcon}
              color="inherit"
              sx={{ mr: 1, pt: 1, fontSize: 'x-large' }}
            />
          )}
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
