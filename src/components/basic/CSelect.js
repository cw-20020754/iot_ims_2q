import React, { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { isNull } from 'common/utils';

const CSelect = (props) => {
  const {
    label,
    name,
    size,
    style,
    value,
    optionArray,
    variant,
    onValidation,
    onValidationError,
    ...rest
  } = props;

  const [helpText, setHelpText] = useState('');

  const handleValidation = (e) => {
    const errorMessage = onValidation(e.target.value);
    if (!isNull(errorMessage)) {
      setHelpText(errorMessage);
      return onValidationError();
    }
  };

  return (
    <FormControl
      fullWidth
      size={!isNull(size) ? size : 'small'}
      variant={!isNull(variant) ? variant : 'standard'}
      sx={{ ...style, width: 1 }}
      error={!isNull(helpText)}
      {...rest}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onBlur={(e) => onValidation && handleValidation(e)}
        {...rest}
      >
        {optionArray &&
          optionArray.map((option) => (
            <MenuItem key={option.text} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
      </Select>
      {!isNull(helpText) && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
};

CSelect.displayName = 'CSelect';

export default CSelect;
