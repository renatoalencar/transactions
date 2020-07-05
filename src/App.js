import React from 'react';

import Balance from './components/Balance';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

import './App.css';
import { classnames } from './util';
import { useToggle, useTransactions } from './effects';

function EmptyState() {
  return <p className="EmptyState">
           It looks like you don't have any transactions yet.
         </p>;
}

function App() {
  const [transactions, addTransaction, clearTransactions] = useTransactions();
  const [showForm, toggleForm] = useToggle(false);
  
  return (
    <div className="App">
      <div className={classnames({
          box: true,
          hidden: showForm,
        })}>
        <Balance transactions={transactions} onAdd={toggleForm}/>
        {transactions.length > 0
         ? <>
             <TransactionList transactions={transactions} />
             <button className="clear" onClick={clearTransactions}>
               Clear
             </button>
           </>
         : <EmptyState />}
      </div>

      <div className={classnames({ hidden: !showForm })}>
        <TransactionForm onAdd={addTransaction} onClose={toggleForm}/>
      </div>
    </div>
  );
}

export default App;
