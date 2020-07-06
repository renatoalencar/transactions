import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CurrencyControlledField from './CurrencyControlledField';


describe('test currency field', () => {
  test('with common ordinary float input', () => {
    const handler = jest.fn();
    const component = render(
      <CurrencyControlledField id='field' value='' onChange={handler}>
        Field
      </CurrencyControlledField>
    );
    const inputValue = '4.75';

    fireEvent.change(component.getByLabelText(/field/i), { target: { value: inputValue } });

    expect(handler).toHaveBeenCalledWith({
        value: 4.75,
        valid: true,
    });
  });

  test('with negative value', () => {
    const handler = jest.fn();
    const component = render(
      <CurrencyControlledField id='field' value='' onChange={handler}>
        Field
      </CurrencyControlledField>
    );
    const inputValue = '-2.89';

    fireEvent.change(component.getByLabelText(/field/i), { target: { value: inputValue } });

    expect(handler).toHaveBeenCalledWith({ value: -2.89, valid: true });
  });

  test('with invalid input', () => {
    const handler = jest.fn();
    const component = render(
      <CurrencyControlledField id='field' value='' onChange={handler}>
        Field
      </CurrencyControlledField>
    );
    const inputValue = '-R$.';

    fireEvent.change(component.getByLabelText(/field/i), { target: { value: inputValue } });

    expect(handler).toHaveBeenCalledWith(expect.objectContaining({ valid: false }));

  });

  test('with formatted prices', () => {
    const handler = jest.fn();
    const component = render(
      <CurrencyControlledField id='field' value='' onChange={handler}>
        Field
      </CurrencyControlledField>
    );

    fireEvent.change(component.getByLabelText(/field/i), { target: { value: 'R$7.99' } });
    fireEvent.change(component.getByLabelText(/field/i), { target: { value: 'R$ -7.31' } });
    fireEvent.change(component.getByLabelText(/field/i), { target: { value: '-R$9.55' } });

    expect(handler).toHaveBeenCalledWith({ value: 7.99, valid: true });
    expect(handler).toHaveBeenCalledWith({ value: -7.31, valid: true });
    expect(handler).toHaveBeenCalledWith({ value: -9.55, valid: true  });
  });

  test('typing a negative formatted value letter by letter', () => {
    const handler = jest.fn();
    const component = render(
      <CurrencyControlledField id='field' value='' onChange={handler}>
        Field
      </CurrencyControlledField>
    );
    const value = '-R$12.76';

    for (let i = 0; i < value.length; i++ ) {
      fireEvent.change(component.getByLabelText(/field/i), { target: { value: value.slice(0, i + 1) } });
    }

    expect(handler).toHaveBeenLastCalledWith({ value: -12.76, valid: true });
  });
});
