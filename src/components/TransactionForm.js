import React, { useState } from 'react';

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

export default function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  function addTransaction() {
    if (!(isEmpty(description) || isEmpty(value))) {
      onAdd({ description, value });
    }
  }

  return (
    <div className="TransactionForm">
      <label htmlFor="description">Description</label>
      <input
        id="description" 
        value={description}
        onChange={eventValue(setDescription)}/>
      <label htmlFor="value">Value</label>
      <input
        id="value"
        type="number"
        value={value}
        onChange={eventValue(setValue, parseFloat)}/>

      <button onClick={addTransaction}>add</button>
    </div>
  );
}

