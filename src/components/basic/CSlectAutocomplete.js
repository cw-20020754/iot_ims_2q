import React, { useCallback, useState } from 'react';
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import { checkValidtaion, isNull } from 'common/utils';

const CSlectAutocomplete = React.forwardRef((props, ref) => {
  const {
    name,
    label,
    optionArray,
    getOption,
    variant,
    style,
    value,
    getValue,
    rules,
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
    <FormControl error={!isNull(helpText)} fullWidth>
      <Autocomplete
        ref={ref}
        name={name}
        options={optionArray}
        getOptionLabel={(option) => option[getOption]}
        sx={{ ...style, width: 1 }}
        onBlur={(e) => onValidation && handleValidation(e)}
        onClick={(e) => onValidation && handleValidation(e)}
        onFocus={() => {
          setHelpText('');
        }}
        {...rest}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label={label}
              value={value}
              variant={!isNull(variant) ? variant : 'standard'}
              name={name}
            />
          );
        }}
      />
      {!isNull(helpText) && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
});

CSlectAutocomplete.displayName = 'CSlectAutocomplete';

export default CSlectAutocomplete;
