import React, { memo } from 'react';

import { formatCurrency } from '../util';

function compareTransactions(a, b) {
  return b.createdAt - a.createdAt;
}

function TransactionList({ transactions }) {
  return (
    <ul>
     {transactions.sort(compareTransactions).map((t) =>
        <li key={t.id} data-time={t.createdAt}>
          <b>{t.description}</b>
          <i>{formatCurrency(t.value)}</i>

          <small>{t.createdAt}</small>
        </li>
     )}
    </ul>
  );
}

export default memo(TransactionList);
