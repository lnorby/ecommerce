import Image from 'next/image';
import Link from 'next/link';

import { formatPrice } from '@/app/(common)/utils/format-price';

export interface ProductItemProps {
   product: ProductSummary;
}

export function ProductItem({ product }: ProductItemProps) {
   return (
      <article className="relative">
         {product.image && (
            <Image
               src={product.image}
               width={350}
               height={350}
               className="mx-auto mb-5"
               alt={product.name}
            />
         )}
         <div className="px-7 text-center">
            <Link
               href={`/products/${product.slug}/${product.id}`}
               className="font-bold text-lg leading-snug extend-clickable-area"
            >
               {/*<Link*/}
               {/*   href={`/products/${product.slug}/${product.id}`}*/}
               {/*   className="extend-clickable-area"*/}
               {/*>*/}
               {product.name}
            </Link>
            <div className="mt-3">
               {product.onSale && (
                  <del className="mr-2 font-medium text-muted">
                     {formatPrice(product.regularPrice)}
                  </del>
               )}
               <span className="font-bold text-accent-primary">{formatPrice(product.price)}</span>
            </div>
            {/*<AddToCart product={product} className="relative" />*/}
         </div>
      </article>
   );
}
