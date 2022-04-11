import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { isNull } from 'common/utils';

const CInput = React.forwardRef((props, ref) => {
  const {
    id,
    type,
    name,
    label,
    value,
    style,
    required = false,
    inputProps,
    variant,
    onValidation,
    onValidationError,
    ...rest
  } = props;

  const [helpText, setHelpText] = useState('');

  const handleValidation = (e) => {
    const errorMessage = onValidation(e.target.value);

    if (!isNull(errorMessage) && typeof errorMessage === 'string') {
      setHelpText(errorMessage);
      if (onValidationError) {
        return () => onValidationError();
      }
    }
  };

  return (
    <TextField
      inputRef={ref}
      id={id}
      name={name}
      type={type}
      label={label}
      value={value}
      sx={{ ...style, width: 1 }}
      variant={isNull(variant) ? 'standard' : variant}
      InputProps={inputProps}
      size={'small'}
      onBlur={(e) => onValidation && handleValidation(e)}
      onFocus={() => {
        setHelpText('');
      }}
      error={!isNull(helpText)}
      helperText={helpText}
      {...rest}
    />
  );
});

CInput.displayName = 'CInput';

export default CInput;
