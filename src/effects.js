import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export function useTransactions() {
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

  function clearTransactions() {
    setTransactions([]);
  }

  return [transactions, addTransaction, clearTransactions];
}

export function useToggle(initialState) {
  const [state, setState] = useState(initialState);

  function toggle() {
    setState(!state);
  }

  return [state, toggle];
}
