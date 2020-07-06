import React, { useState } from 'react';

import { classnames } from '../util';
import './TransactionForm.css';

function eventValue(changer, parser) {
  const parserFn = parser || (v => v);
  return (event) => changer(parserFn(event.target.value));
}

function isEmpty(value) {
  return value === undefined
         || value === null
         || value.length === 0
         || value === {}
         || Number.isNaN(value);
}


function Field({ id, type, onChange, value, placeholder, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}/>
    </div>
  );
}

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
        onChange={eventValue(setDescription)}>
        Description
      </Field>

      <Field
        id="value"
        type="number"
        label="value"
        placeholder="R$ 5,00"
        value={value}
        onChange={eventValue(setValue, parseFloat)}>
        Value
      </Field>


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

