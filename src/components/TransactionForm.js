import React, { useState } from 'react';

import './TransactionForm.css';

function eventValue(changer, parser) {
  const parserFn = parser || (v => v);
  return (event) => changer(parserFn(event.target.value));
}

function isEmpty(value) {
  return value === undefined
         || value === null
         || value.length === 0
         || value === {};
}


function Field({ id, type, onChange, value, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        value={value}
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
        type="text"
        value={description}
        onChange={eventValue(setDescription)}>
        Description
      </Field>

      <Field
        id="value"
        type="number"
        value={value}
        onChange={eventValue(setValue, parseFloat)}>
        Value
      </Field>

      <div className="field">
        <button onClick={addTransaction}>Done</button>
      </div>
    </div>
  );
}

