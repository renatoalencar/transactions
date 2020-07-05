import React, { memo } from 'react';

import './TransactionList.css';
import CoolTime from './CoolTime';
import { formatCurrency, compareTransactions } from '../util';

function TransactionList({ transactions }) {
  return (
    <ul className="TransactionList">
     {transactions.sort(compareTransactions).map((t) =>
        <li key={t.id} data-time={t.createdAt}>
          <b>{t.description}</b>
          <i className={t.value < 0 ? 'negative' : ''}>
            {formatCurrency(t.value)}
          </i>

          <CoolTime time={t.createdAt}/>
        </li>
     )}
    </ul>
  );
}

export default memo(TransactionList);
