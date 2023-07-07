'use client';

import { useState } from 'react';
import { apiRequest } from '@/utils/api';

interface AddToCartProps {
   className?: string;
   product: Product;
}

export default function AddToCart({ className, product }: AddToCartProps) {
   const [isAdding, setIsAdding] = useState(false);

   async function addToCart() {
      setIsAdding(true);

      const response = await apiRequest('/wc/store/v1/cart/add-item', {
         method: 'POST',
         body: JSON.stringify({
            id: product.id,
            quantity: 1,
         }),
      });

      console.log(response);

      setIsAdding(false);
   }

   return (
      <button type="button" className={className} onClick={() => addToCart()} disabled={isAdding}>
         Kosárba
      </button>
   );
}
