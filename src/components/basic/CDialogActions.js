import * as React from 'react';
import { styled } from '@mui/material/styles';
import { DialogActions } from '@mui/material';

const CDialogActions = (props) => {
  const { children, sx, ...rest } = props;

  const CDialogActions = styled(DialogActions)(({ theme }) => ({}));

  return (
    <CDialogActions sx={sx} {...rest}>
      {children}
    </CDialogActions>
  );
};

export default CDialogActions;
