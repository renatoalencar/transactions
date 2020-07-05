import React, { memo } from 'react';

import './Balance.css';
import { formatCurrency } from '../util';

function Balance({ transactions, onAdd }) {
  const total = transactions.map(t => t.value).reduce((a, b) => a + b, 0);

  return (
    <div className="Balance">
      <span>Balance</span>
      {formatCurrency(total)}

      <button aria-label="add" onClick={onAdd}>+</button>
    </div>
  );
}

export default memo(Balance);
