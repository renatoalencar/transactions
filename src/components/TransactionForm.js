import React, { useState } from 'react';
import { isEmpty, prop, when, pipe, assoc, objOf, head, equals, filter } from 'ramda';
import Joi from '@hapi/joi';
import { classnames } from '../util';
import Field from './Field';
import CurrencyControlledField from './CurrencyControlledField';
import './TransactionForm.css';

const eventValue = pipe(prop('target'), prop('value'));

const TransactionSchema = Joi.object({
  description: Joi.string()
    .required()
    .messages({
      'string.empty': 'description should not be empty',
    }),
  value: Joi.number()
    .required()
    .messages({
      'number.base': 'value can not be empty or in an invalid format',
    })
});

function useFormState() {
  const [description, setDescription] = useState();
  const [value, setValue] = useState();

  function setForm({ description, value }) {
    setValue(value);
    setDescription(description);
  }

  return [{ description, value }, setForm];
}

function useValidation(schema, consequence) {
  const [error, setError] = useState();

  function perform(obj) {
    const validation = schema.validate(obj);

    if (validation.error) {
      setError(validation.error);
      return;
    }

    consequence(validation.value);
  }

  function clear() {
    setError(undefined);
  }

  return [error, perform, clear];
}

export default function TransactionForm({ onAdd, onClose }) {
  const [{ description, value }, setForm] = useFormState();
  const [error, validateAndPerform, clearErrors] = useValidation(TransactionSchema, (form) => {
    onAdd(form);
    setForm({});
    clearErrors();
    onClose();
  });

  function clearForm() {
    setForm({});
    clearErrors();
  }

  function addTransaction() {
    validateAndPerform({
      description: description || '',
      value: value || '',
    });
  }

  return (
    <div className="TransactionForm box form">
      <header>
        Add a transaction
        <button className="close" onClick={pipe(clearForm, onClose)}>+</button>
      </header>

      <Field
        id="description"
        label="description"
        type="text"
        value={description || ''}
        placeholder="a coffee, a donut, mommy's deposit"
        errors={error &&
          filter(
            pipe(prop('path'), head, equals('description')),
            error.details,
          )}
        onChange={pipe(
          eventValue,
          objOf('description'),
          assoc('value', value),
          setForm
        )}>
        Description
      </Field>

      <CurrencyControlledField
        id="value"
        type="number"
        label="value"
        placeholder="R$ 5,00"
        value={value || ''}
        errors={error &&
          filter(
            pipe(prop('path'), head, equals('value')),
            error.details,
          )}
        onChange={when(
            prop('valid'),
            pipe(
              prop('value'),
              objOf('value'),
              assoc('description', description),
              setForm
            ),
        )}>
        Value
      </CurrencyControlledField>


      <div className="field">
        <button
          className={classnames({
            InputTypeButton: true,
            input: value >= 0,
            output: value < 0,
            hidden: !Number.isFinite(value),
          })}
          onClick={() => (!isEmpty(value) && setForm({ description, value: -value }))}>
            {value >= 0 ? '+ Input' : '- Output'}
        </button>
      </div>

      <div className="field">
        <button onClick={addTransaction}>Done</button>
      </div>
    </div>
  );
}

