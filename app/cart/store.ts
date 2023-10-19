import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartStoreState {
   checkoutId: string | undefined;
   setCheckoutId: (id: string) => void;
   isDialogOpen: boolean;
   openDialog: () => void;
   closeDialog: () => void;
}

export const useCartStore = create<CartStoreState>(
   persist(
      (set, get) => ({
         checkoutId: undefined,
         setCheckoutId: (id: string) => set(() => ({ checkoutId: id })),
         isDialogOpen: false,
         openDialog: () => set(() => ({ isDialogOpen: true })),
         closeDialog: () => set(() => ({ isDialogOpen: false })),
      }),
      {
         name: 'cart',
      }
   )
);
