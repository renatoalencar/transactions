import React, { useState, useEffect } from 'react';
import { isEmpty, prop, when, pipe } from 'ramda';

import { classnames, formatCurrency } from '../util';
import './TransactionForm.css';
import Field from './Field';
import CurrencyControlledField from './CurrencyControlledField';

const eventValue = pipe(prop('target'), prop('value'));

export default function TransactionForm({ onAdd, onClose }) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  function addTransaction() {
    if (!(isEmpty(description) || isEmpty(value))) {
      onAdd({ description, value });
      setValue('');
      setDescription('');
      onClose();
    }
  }

  return (
    <div className="TransactionForm box form">
      <header>
        Add a transaction
        <button className="close" onClick={onClose}>+</button>
      </header>

      <Field
        id="description"
        label="description"
        type="text"
        value={description}
        placeholder="a coffee, a donut, mommy's deposit"
        onChange={pipe(eventValue, setDescription)}>
        Description
      </Field>

      <CurrencyControlledField
        id="value"
        type="number"
        label="value"
        placeholder="R$ 5,00"
        value={value}
        onChange={when(
            prop('valid'),
            pipe(prop('value'), setValue),
        )}>
        Value
      </CurrencyControlledField>


      <div className="field">
        <button
          className={classnames({
            InputTypeButton: true,
            input: value >= 0,
            output: value < 0,
            hidden: !Number.isFinite(value),
          })}
          onClick={() => (!isEmpty(value) && setValue(-value))}>
            {value >= 0 ? '+ Input' : '- Output'}
        </button>
      </div>

      <div className="field">
        <button onClick={addTransaction}>Done</button>
      </div>
    </div>
  );
}

