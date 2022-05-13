import React from 'react';
import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { isNull } from 'common/utils';
import { useTheme } from '@mui/styles';

const CButton = (props) => {
  const {
    type,
    name,
    variant,
    text,
    style,
    color,
    startIcon,
    endIcon,
    children,
    ...rest
  } = props;

  const theme = useTheme();

  const customType = {
    save: {
      border: `1px solid ${
        !isNull(theme.palette.primary) && theme.palette.primary.main
      }`,
    },
    cancel: {
      color: !isNull(theme.palette.neutral) && theme.palette.neutral.main,
      border: `1px solid ${
        !isNull(theme.palette.neutral) && theme.palette.neutral.main
      }`,
    },
  };
  const Button = styled(MuiButton)(({ theme }) => ({
    fontWeight: 600,
    boxShadow: isNull(variant) && theme.shadows[2],
    fontsize: '0.825rem',
    // '&:hover': {
    //   backgroundColor: isNull(variant) && theme.palette.grey[100],
    // },
    ...(isNull(color) && !isNull(type) && customType[type]),
  }));

  return (
    <Button
      name={name}
      variant={isNull(variant) ? 'outlined' : variant}
      color={color}
      sx={style}
      startIcon={startIcon}
      endIcon={endIcon}
      type={type}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CButton;
