import React, { useCallback, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { checkValidtaion, isNull } from '../../common/utils';

const CSelect = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    size,
    style,
    value,
    optionArray,
    variant,
    rules,
    ...rest
  } = props;

  const [helpText, setHelpText] = useState('');

  const validateCheck = useCallback(() => {
    if (!isNull(rules) && !isNull(rules.conditions)) {
      const result = checkValidtaion(rules.conditions);

      !isNull(result) ? setHelpText(result) : setHelpText('');
    }
  }, [rules]);

  return (
    <FormControl
      fullWidth
      size={!isNull(size) ? size : 'small'}
      variant={!isNull(variant) ? variant : 'standard'}
      sx={style}
      error={!isNull(helpText)}
      {...rest}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value || ''}
        ref={ref}
        onBlur={validateCheck}
        {...rest}
      >
        {optionArray.map((option) => (
          <MenuItem key={option.text} value={option.value || ''}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      {!isNull(helpText) && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
});

CSelect.displayName = 'CSelect';

export default CSelect;
