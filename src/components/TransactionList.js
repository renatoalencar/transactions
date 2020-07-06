import React, { memo } from 'react';

import './TransactionList.css';
import CoolTime from './CoolTime';
import { classnames, formatCurrency, compareTransactions } from '../util';

function TransactionList({ transactions }) {
  return (
    <ul className="TransactionList">
     {transactions.sort(compareTransactions).map((t) =>
        <li key={t.id} data-time={t.createdAt}>
          <b className="TransactionList__item-description">
            {t.description}
          </b>
          <i
            className={classnames({
              'TransactionList__item-value': true,
              negative: t.value < 0,
            })}>
            {formatCurrency(t.value)}
          </i>

          <CoolTime time={t.createdAt}/>
        </li>
     )}
    </ul>
  );
}

export default memo(TransactionList);
