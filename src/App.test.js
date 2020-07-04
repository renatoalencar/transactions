import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('adding a transaction', async () => {
  const app = render(<App />);

  fireEvent.click(app.getByText(/click me/i));

  expect(app.getByText(/hello/i)).toBeInTheDocument();
});
