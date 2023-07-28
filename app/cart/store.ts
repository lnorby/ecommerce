import { create } from 'zustand';
import { api } from '@/app/(common)/lib/api';

export interface CartStoreState {
   isDialogOpen: boolean;
   items: CartItem[];
   total: number;
   isUpdating: boolean;
   openDialog: () => void;
   closeDialog: () => void;
   fetchCart: () => void;
   addItem: (id: number, quantity: number) => void;
   updateItem: (key: string, quantity: number) => void;
   removeItem: (key: string) => void;
   updateCart: (data: any) => void;
}

export const useCartStore = create<CartStoreState>((set, get) => ({
   isDialogOpen: false,
   items: [],
   total: 0,
   isUpdating: false,
   openDialog: () => set(() => ({ isDialogOpen: true })),
   closeDialog: () => set(() => ({ isDialogOpen: false })),
   fetchCart: async () => {
      set(() => ({ isUpdating: true }));
      const { data } = await api.get<any>('/wc/store/v1/cart');
      get().updateCart(data);
      set(() => ({ isUpdating: false }));
   },
   addItem: async (id: number, quantity: number) => {
      set(() => ({ isUpdating: true }));
      const { data } = await api.post('/wc/store/v1/cart/add-item', { id, quantity });
      get().updateCart(data);
      set(() => ({ isUpdating: false }));
   },
   updateItem: async (key: string, quantity: number) => {
      set(() => ({ isUpdating: true }));
      const { data } = await api.post('/wc/store/v1/cart/update-item', { key, quantity });
      get().updateCart(data);
      set(() => ({ isUpdating: false }));
   },
   removeItem: async (key: string) => {
      set(() => ({ isUpdating: true }));
      const { data } = await api.post('/wc/store/v1/cart/remove-item', { key });
      get().updateCart(data);
      set(() => ({ isUpdating: false }));
   },
   updateCart: (data) => {
      set(() => ({
         items: data.items.map((item: any) => ({
            key: item.key,
            id: item.id,
            quantity: item.quantity,
            name: item.name,
            sku: item.sku,
            image: item.images[0]?.src,
            price: item.prices.price / 100,
         })),
         total: data.totals.total_items / 100,
      }));
   },
}));

useCartStore.getState().fetchCart();
