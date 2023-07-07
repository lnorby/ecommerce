import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import Price from '@/components/price';
import AddToCart from '@/components/add-to-cart';

interface ProductItemProps {
   product: Product;
   layout: 'horizontal' | 'vertical';
}

export default function ProductItem({ product, layout }: ProductItemProps) {
   return (
      <div
         className={twMerge(
            'relative flex',
            layout === 'horizontal' && 'flex-row',
            layout === 'vertical' && 'flex-col'
         )}
      >
         {product.images && (
            <Image
               src={product.images[0]}
               width={300}
               height={300}
               className={twMerge(
                  'shrink-0 object-cover',
                  layout === 'horizontal' && 'w-[150px] h-[150px] mr-4',
                  layout === 'vertical' && 'w-[300px] h-[300px]'
               )}
               alt={product.name}
            />
         )}
         <div className="flex-1">
            <Link
               href={`/products/${product.slug}/${product.id}`}
               className="extend-clickable-area"
            >
               {/*<Link*/}
               {/*   href={`/products/${product.slug}/${product.id}`}*/}
               {/*   className="extend-clickable-area"*/}
               {/*>*/}
               {product.name}
            </Link>
            <Price amount={product.price} />
            <AddToCart product={product} className="relative" />
         </div>
      </div>
   );
}
