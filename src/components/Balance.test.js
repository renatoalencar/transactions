import React from 'react';
import { render } from '@testing-library/react';
import Balance from './Balance';
import transactions from './samples/transactions';

test('it should show the correct balance', () => {
  const balance = render(<Balance transactions={transactions} />);

  expect(balance.getByText('R$12.71')).toBeInTheDocument();
});
