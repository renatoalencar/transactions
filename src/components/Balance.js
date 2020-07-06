import React, { memo } from 'react';

import './Balance.css';
import { formatCurrency } from '../util';

function Balance({ transactions, onAdd }) {
  const total = transactions.map(t => t.value).reduce((a, b) => a + b, 0);

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
