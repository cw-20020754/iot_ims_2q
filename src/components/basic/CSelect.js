import React, { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { isNull } from 'common/utils';

const CSelect = React.forwardRef((props, ref) => {
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
    open,
    inputProps,
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
        ref={ref}
        open={open}
        name={name}
        value={value}
        inputProps={inputProps}
        onBlur={(e) => onValidation && handleValidation(e)}
        onClick={(e) => onValidation && handleValidation(e)}
        onFocus={() => {
          setHelpText('');
        }}
        {...rest}
      >
        {optionArray &&
          optionArray.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            );
          })}
      </Select>
      {!isNull(helpText) && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
});

CSelect.displayName = 'CSelect';

export default CSelect;
