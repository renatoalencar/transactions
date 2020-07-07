import React from 'react';
import { classnames } from '../util';
import './Field.css';

function ErrorList({ errors }) {
  return errors && errors.length > 0 
    ? (
      <ul className="Field__ErrorList">
        {errors.map((error, i) => (
          <li key={i}>{error.message}</li>
        ))}
      </ul>
    )
    : null;
}

export default function Field({ id, type, onChange, value, placeholder, children, errors }) {
  return (
    <div className={classnames({
      Field: true,
      invalid: errors && errors.length > 0,
    })}>
      <label className="Field__label" htmlFor={id}>{children}</label>
      <ErrorList errors={errors} />
      <input
        id={id}
        className="Field__input"
        value={value}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}/>
    </div>
  );
}
