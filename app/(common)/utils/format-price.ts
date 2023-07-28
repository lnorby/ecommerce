export function formatPrice(amount: number): string {
   return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
   }).format(amount);
}
