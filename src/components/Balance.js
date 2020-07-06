import React, { memo } from 'react';
import { map, prop, reduce, pipe, add } from 'ramda';

import './Balance.css';
import { formatCurrency } from '../util';

function Balance({ transactions, onAdd }) {
  const total = pipe(
    map(prop('value')),
    reduce(add, 0),
  )(transactions);

  return (
    <div className="Balance">
      <span className="Balance__label">Balance</span>
      {formatCurrency(total)}

      <button
        className="Balance__add-btn"
        aria-label="add"
        onClick={onAdd}>
        +
      </button>
    </div>
  );
}

export default memo(Balance);
