import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Dialog } from '@mui/material';
import Zoom from '@mui/material/Zoom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

const CDialog = (props) => {
  const { id, onClose, fullWidth, maxWidth, open, sx, children, ...rest } =
    props;

  return (
    <Dialog
      id={id}
      fullWidth={fullWidth ? fullWidth : true}
      maxWidth={maxWidth ? maxWidth : 'xs'}
      open={open}
      onClose={() => onClose()}
      sx={sx}
      TransitionComponent={Transition}
      {...rest}
    >
      {children}
    </Dialog>
  );
};

export default CDialog;
