import React, { useState } from 'react';
import './App.css';

function eventValue(changer, parser) {
  const parserFn = parser || (v => v);
  return (event) => changer(parserFn(event.target.value));
}

function parseCommaFloat(n) {
  return parseFloat(n.replace(/,/g, '.'));
}

function toLocaleString(n) {
  return n.toString().replace(/\./g, ',');
}

function isEmpty(value) {
  return value === undefined
         || value === null
         || value.length === 0
         || value === {}
}

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  function addTransaction() {
    if (!(isEmpty(description) || isEmpty(value))) {
      onAdd({ description, value })
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
      <input id="value"
        value={value}
        onChange={eventValue(setValue, parseCommaFloat)}/>

      <button onClick={addTransaction}>add</button>
    </div>
  );
}

function TransactionList({ transactions }) {
  return (
    <ul>
     {transactions.map((t, i) =>
        <li key={i}>
          <b>{t.description}</b>
          <i>R$ {toLocaleString(t.value)}</i>
        </li>
     )}
    </ul>
  );
}

function App() {
  const [transactions, setTransactions] = useState([]);

  function addTransaction(t) {
    setTransactions([
       ...transactions,
       t,
    ]);
  }

  return (
    <div className="App">
      <TransactionForm onAdd={addTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;
