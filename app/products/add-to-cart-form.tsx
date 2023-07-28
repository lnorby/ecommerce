'use client';

import { FormEvent, useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { Input } from '@/app/(common)/components/form/input';
import { Button } from '@/app/(common)/components/ui/button';
import { useCartStore } from '@/app/cart/store';

export interface AddToCartFormProps {
   product: number;
}

export function AddToCartForm({ product }: AddToCartFormProps) {
   const inputRef = useRef<HTMLInputElement | null>(null);
   const [isAdding, setIsAdding] = useState(false);

   const { openDialog, addItem } = useCartStore(
      (state) => ({
         openDialog: state.openDialog,
         addItem: state.addItem,
      }),
      shallow
   );

   async function addToCart(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      setIsAdding(true);
      await addItem(product, Number(inputRef.current?.value ?? 1));
      setIsAdding(false);

      openDialog();

      event.target.reset();
   }

   return (
      <form onSubmit={addToCart} className="flex space-x-4">
         <Input type="number" className="w-16" defaultValue="1" ref={inputRef} />
         <Button type="submit" size="md" variant="primary" disabled={isAdding}>
            Kosárba
         </Button>
      </form>
   );
}
