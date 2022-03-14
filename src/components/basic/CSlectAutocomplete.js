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
    ...rest
  } = props;

  const validateCheck = useCallback(() => {
    if (!isNull(rules) && !isNull(rules.conditions)) {
      const result = checkValidtaion(rules.conditions);

      !isNull(result) ? setHelpText(result) : setHelpText('');
    }
  }, [rules]);

  const [helpText, setHelpText] = useState('');

  return (
    <FormControl error={!isNull(helpText)} fullWidth>
      <Autocomplete
        ref={ref}
        name={name}
        options={optionArray}
        getOptionLabel={(option) => option[getOption]}
        sx={{ ...style, width: 1 }}
        onBlur={validateCheck}
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
