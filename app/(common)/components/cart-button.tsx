'use client';

import { useCartStore } from '@/app/cart/store';

export interface CartButtonProps {}

export function CartButton({}: CartButtonProps) {
   const openDialog = useCartStore((state) => state.openDialog);

   return (
      <button
         className="px-5 py-2 border border-[rgba(33,37,41,0.5)] font-bold transition hover:bg-[#1a1a1a] hover:text-inverted"
         onClick={openDialog}
      >
         Kosár
      </button>
   );
}
