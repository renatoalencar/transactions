import React, { useState, useEffect } from 'react';
import {
    isEmpty, test, pipe, prop
} from 'ramda';
import { formatCurrency } from '../util';
import Field from './Field';

function parseCurrency(s) {
 return parseFloat(s.toString().replace(/[R$\s]*/g, ''));
}

const isPartialyValid = test(/^-?R?\$?\s*-?[0-9]*[.,]?[0-9]*$/);

function isCompletelyValid(val) {
  return Number.isFinite(val) && !Number.isNaN(val);
}

export default function CurrencyControlledField({ id, placeholder, value, onChange, children }) {
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
    if (!isEmpty(value) && parseCurrency(localValue) !== value) {
      setValue(formatCurrency(value));
    }
  }, [value]);

  return <Field
           id={id}
           type="text"
           placeholder={placeholder}
           value={localValue}
           onChange={pipe(prop('target'), prop('value'), validate)}
           children={children}/>;
}
