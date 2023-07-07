interface PriceProps {
   amount: number;
   locale?: string;
   currency?: string;
   className?: string;
}

export default function Price({
   amount,
   locale = 'hu-HU',
   currency = 'HUF',
   className,
}: PriceProps) {
   return (
      <div className={className}>
         {new Intl.NumberFormat(locale.toString(), {
            style: 'currency',
            currency: currency.toString(),
            maximumFractionDigits: 0,
         }).format(amount)}
      </div>
   );
}
