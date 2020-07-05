import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const storage = {
  key: '::transactions',

  load() {
    return JSON.parse(localStorage.getItem(this.key));
  },

  persist(transactions) {
    localStorage.setItem(this.key, JSON.stringify(transactions));
  },
};

export function useTransactions() {
  const [transactions, setTransactions] = useState(storage.load() || []);

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

  useEffect(() => {
    storage.persist(transactions);
  }, [transactions]);

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
