import React, { useState, useEffect } from 'react';
import { isEmpty, test, pipe, prop } from 'ramda';
import Field from './Field';

function parseCurrency(s) {
 return parseFloat(String(s).replace(/[R$\s]*/g, ''));
}

const isPartialyValid = test(/^-?R?\$?\s*-?[0-9]*[.,]?[0-9]*$/);

function isCompletelyValid(val) {
  return Number.isFinite(val) && !Number.isNaN(val);
}

export default function CurrencyControlledField({ value, onChange, ...props }) {
  const [localValue, setValue] = useState(value);

  function setUpstream(val) {
    onChange({
      value: val,
      valid: isCompletelyValid(val),
    });
  }

  function validate(val) {
    if (!isPartialyValid(val)) {
      return;
    }

    setValue(val);
    setUpstream(parseCurrency(val));
  }

  useEffect(() => {
    if (isEmpty(value)) {
      setValue('');
      return;
    }

    if (parseCurrency(localValue) === value) {
      return;
    }

    setValue(value);
  }, [value]); /* eslint-disable-line react-hooks/exhaustive-deps */

  return <Field
           type="text"
           value={localValue}
           onChange={pipe(prop('target'), prop('value'), validate)}
           {...props}/>;
}
