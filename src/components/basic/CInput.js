import React from 'react';
import { TextField } from '@mui/material';

const CInput = (props) => {
  const {
    id,
    name,
    label,
    value,
    style,
    required = false,
    helperText,
    error,
    inputProps,
  } = props;

  // console.log('props >> ', props);

  return (
    <TextField
      id={id}
      name={name}
      type={id}
      label={label}
      defaultValue={value}
      sx={style}
      fullWidth
      helperText={helperText}
      variant="standard"
      InputProps={inputProps}
      required={required}
      error={error}
    />
  );
};

export default CInput;
