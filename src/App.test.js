import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('adding a transaction', async () => {
  const app = render(<App />);

  fireEvent.change(app.getByLabelText(/description/i), {
    target: { value: 'a coffee' },
  });
  fireEvent.change(app.getByLabelText(/value/i), {
    target: { value: '2.75' },
  });
  fireEvent.click(app.getByText(/add/i));

  expect(app.getByText(/a coffee/)).toBeInTheDocument();
  expect(app.getByText('R$ 2.75')).toBeInTheDocument();
  expect(app.getByText('Balance: R$ 2.75')).toBeInTheDocument();
});

describe('cant add invalid transaction', () => {
  test('with description empty', () => {
    const app = render(<App />);

    fireEvent.change(app.getByLabelText(/value/i), {
      target: { value: '2.75' },
    });
    /* The description field is left empty */
    fireEvent.click(app.getByText(/add/i));

    expect(app.queryAllByText('R$ 2.75')).toHaveLength(0);
  });

  test('with value empty', () => {
    const app = render(<App />);

    fireEvent.change(app.getByLabelText(/description/i), {
      target: { value: 'a coffee' },
    });
    /* The value field is left empty */
    fireEvent.click(app.getByText(/add/i));

    expect(app.queryAllByText('a coffee')).toHaveLength(0);
  });
});
