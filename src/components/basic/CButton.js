import React from 'react';
import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CButton = (props) => {
  const { name, variant, text, style, type, startIcon, endIcon, ...rest } =
    props;

  const Button = styled(MuiButton)(({ theme }) => ({
    fontWeight: 600,
    backgroundColor: '#fff',
    boxShadow: variant === 'outlined' && theme.shadows[2],
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  }));

  return (
    <Button
      name={name}
      variant={variant}
      color={type}
      sx={style}
      startIcon={startIcon}
      endIcon={endIcon}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default CButton;
