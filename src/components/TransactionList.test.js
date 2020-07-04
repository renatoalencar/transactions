import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TransactionList from './TransactionList';
import transactions from './samples/transactions';

test('the transactions should be rendered in reverse chronological order', () => {
  const list = render(<TransactionList transactions={transactions} />);
  
  const timestamps = Array.from(
    list
      .container
      .querySelectorAll('li')
  ).map(el => el.getAttribute('data-time'))
   .map(t => parseInt(t));

  expect(timestamps)
   .toEqual([].concat(timestamps).sort((a, b) => b - a));
});
