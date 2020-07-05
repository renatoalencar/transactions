export function formatCurrency(value) {
  return Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function compareTransactions(a, b) {
  return b.createdAt - a.createdAt;
}

export function classnames(obj) {
  return Object.entries(obj)
    .map(([key, value]) => {
      return [key, typeof value === 'function' ? value() : value];
    })
    .filter(([_, value]) => value)
    .map(([key, _]) => key)
    .join(' ');
}
