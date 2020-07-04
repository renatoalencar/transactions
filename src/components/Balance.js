import React, { memo } from 'react';

import { formatCurrency } from '../util';

function Balance({ transactions }) {
  const total = transactions.map(t => t.value).reduce((a, b) => a + b, 0);

  return <p>Balance: {formatCurrency(total)}</p>;
}

export default memo(Balance);
