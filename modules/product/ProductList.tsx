'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import ProductItem from '@/modules/product/ProductItem';

interface ProductListProps {
   products: Product[];
   layout?: 'horizontal' | 'vertical';
   layoutSelectable: boolean;
}

export default function ProductList({
   products,
   layout: initialLayout = 'horizontal',
   layoutSelectable,
}: ProductListProps) {
   const [layout, setLayout] = useState(initialLayout);

   return (
      <div>
         {layoutSelectable && (
            <div className="flex space-x-3">
               <button
                  type="button"
                  onClick={() => setLayout('horizontal')}
                  disabled={layout === 'horizontal'}
               >
                  horizontális
               </button>
               <button
                  type="button"
                  onClick={() => setLayout('vertical')}
                  disabled={layout === 'vertical'}
               >
                  vertikális
               </button>
            </div>
         )}
         <div
            className={twMerge(
               layout === 'horizontal' && 'grid grid-cols-5 gap-6',
               layout === 'vertical' && 'space-y-5'
            )}
         >
            {products.map((product) => (
               <ProductItem
                  product={product}
                  layout={layout === 'horizontal' ? 'vertical' : 'horizontal'}
                  key={product.id}
               />
            ))}
         </div>
      </div>
   );
}
