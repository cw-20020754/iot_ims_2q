import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const CSelect = (props) => {
  const { label, name, optionArray, ...rest } = props;

  return (
    <FormControl fullWidth size="small" variant={'standard'}>
      <InputLabel>{label}</InputLabel>
      <Select name={name} {...rest}>
        {optionArray.map((option) => (
          <MenuItem key={option.text} value={option.value || ''}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CSelect;
