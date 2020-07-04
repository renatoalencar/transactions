import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import Balance from './components/Balance';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

import './App.css';

function useTransactions() {
  const [transactions, setTransactions] = useState([]);

  function addTransaction(t) {
    setTransactions([
       ...transactions,
       {
         ...t,
         id: uuid(),
         createdAt: Date.now(),
       },
    ]);
  }

  return [transactions, addTransaction];
}

function App() {
  const [transactions, addTransaction] = useTransactions();
  
  return (
    <div className="App">
      <Balance transactions={transactions}/>
      <TransactionForm onAdd={addTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;
