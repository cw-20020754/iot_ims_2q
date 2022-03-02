import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import { checkValidtaion, isNull } from '../../common/utils';

const CInput = React.forwardRef((props, ref) => {
  const {
    id,
    name,
    label,
    value,
    style,
    required = false,
    inputProps,
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

  useEffect(() => {
    if (!isNull(rules) && !isNull(rules.evtName) && !isNull(ref)) {
      ref.current.value = value;
      ref.current[rules.evtName] = validateCheck;
    }
  }, [ref, rules, validateCheck, value]);

  return (
    <TextField
      ref={ref}
      id={id}
      name={name}
      type={id}
      label={label}
      value={value}
      sx={style}
      variant={isNull(variant) ? 'standard' : variant}
      InputProps={inputProps}
      size={'small'}
      onBlur={() => validateCheck()}
      error={!isNull(helpText)}
      helperText={helpText}
      {...rest}
    />
  );
});

CInput.displayName = 'CInput';

export default CInput;
