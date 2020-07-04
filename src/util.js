export function formatCurrency(value) {
  return Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
