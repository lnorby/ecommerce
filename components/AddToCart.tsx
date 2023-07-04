'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

interface AddToCartProps {
   className?: string;
   product: Product;
}

export default function AddToCart({ className, product }: AddToCartProps) {
   const [isAdding, setIsAdding] = useState(false);

   async function addToCart() {
      setIsAdding(true);

      const response = await api.post('/wc/store/v1/cart/add-item', {
         id: product.id,
         quantity: 1,
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
