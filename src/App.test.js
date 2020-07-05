import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('adding transaction', () => {
  test('with valid inputs', async () => {
    const app = render(<App />);

    fireEvent.click(app.getByText(/add/i));
    fireEvent.change(app.getByLabelText(/description/i), {
      target: { value: 'a coffee' },
    });
    fireEvent.change(app.getByLabelText(/value/i), {
      target: { value: '2.75' },
    });
    fireEvent.click(app.getByText(/done/i));


    expect(app.getByText(/a coffee/)).toBeInTheDocument();
    expect(app.getAllByText('R$2.75')).toHaveLength(2);
  });

  describe('cant add invalid transaction', () => {
    test('with description empty', () => {
      const app = render(<App />);

      fireEvent.change(app.getByLabelText(/value/i), {
        target: { value: '2.75' },
      });
      /* The description field is left empty */
      fireEvent.click(app.getByText(/add/i));

      expect(app.queryAllByText('R$2.75')).toHaveLength(0);
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
});
