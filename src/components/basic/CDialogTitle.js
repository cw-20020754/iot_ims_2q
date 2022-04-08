import * as React from 'react';
import { styled } from '@mui/material/styles';
import { DialogTitle, Grid, Box, Divider } from '@mui/material';

const CDialogTitle = (props) => {
  const {
    sx,
    prependIcon: LabelIcon,
    title,
    children,
    gridsx,
    ...rest
  } = props;

  const CDialogTitle = styled(DialogTitle)(({ theme }) => ({
    fontWeight: 500,
    fontSize: 20,
    paddingRight: 8,
    borderLeftStyle: 'solid',
    borderLeftWidth: '8px',
    borderLeftColor: theme.palette.primary.main,
  }));

  return (
    <CDialogTitle sx={sx} {...rest}>
      <Grid container spacing={1} justifyContent="space-between" sx={gridsx}>
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
