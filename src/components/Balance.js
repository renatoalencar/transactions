import React, { memo } from 'react';

function Balance({ transactions }) {
  const total = transactions.map(t => t.value).reduce((a, b) => a + b, 0);

  return <p>Balance: R$ {total}</p>;
}

export default memo(Balance);
