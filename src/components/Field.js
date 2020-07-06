import React from 'react';

export default function Field({ id, type, onChange, value, placeholder, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}/>
    </div>
  );
}
