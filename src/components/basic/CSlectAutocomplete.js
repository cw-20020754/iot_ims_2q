import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const CSlectAutocomplete = (props) => {
  const { name, label, optionArray, getOption, ...rest } = props;

  return (
    <Autocomplete
      name={name}
      options={optionArray}
      getOptionLabel={(option) => option[getOption]}
      {...rest}
      renderInput={(params) => {
        return (
          <TextField {...params} label={label} variant="standard" name={name} />
        );
      }}
    />
  );
};

export default CSlectAutocomplete;
