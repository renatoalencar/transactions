import React from 'react';
import { v4 as uuid } from 'uuid';
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

    expect(JSON.parse(localStorage.getItem('::transactions')))
      .toMatchObject([
        {
          id: expect.stringMatching(/[a-f0-9\-]+/),
          description: 'a coffee',
          value: 2.75,
          createdAt: expect.any(Number),
        },
      ]);
  });

  test('loading from local storage', () => {
    localStorage.setItem('::transactions', JSON.stringify([
      {
        id: uuid(),
        description: 'a donut',
        value: 8.00,
        createdAt: Date.now(),
      },
      { id: uuid(),
        description: 'pingado',
        value: 2.50,
        createdAt: Date.now(),
      },
    ]));
    
    const app = render(<App />);

    expect(app.getByText('a donut')).toBeInTheDocument();
    expect(app.getByText('R$8.00')).toBeInTheDocument();
    expect(app.getByText('pingado')).toBeInTheDocument();
    expect(app.getByText('R$2.50')).toBeInTheDocument();

    expect(app.getByText('R$10.50')).toBeInTheDocument();
  });

  describe('cant add invalid transaction', () => {
    test('with description empty', () => {
      const app = render(<App />);

      fireEvent.click(app.getByText(/add/i));
      fireEvent.change(app.getByLabelText(/value/i), {
        target: { value: '2.75' },
      });
      /* The description field is left empty */
      fireEvent.click(app.getByText(/done/i));

      expect(app.queryAllByText('R$2.75')).toHaveLength(0);
      expect(app.queryAllByText(/description should not be empty/i)).toHaveLength(1);
    });

    test('with value empty', () => {
      const app = render(<App />);

      fireEvent.click(app.getByText(/add/i));
      fireEvent.change(app.getByLabelText(/description/i), {
        target: { value: 'a coffee' },
      });
      /* The value field is left empty */
      fireEvent.click(app.getByText(/done/i));

      expect(app.queryAllByText('a coffee')).toHaveLength(0);
      expect(app.queryAllByText(/value can not be empty or in an invalid format/i)).toHaveLength(1);
    });
  });
});
