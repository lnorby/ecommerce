import { api } from '@/app/(common)/lib/api';

interface FetchCartProps {
   items: CartItem[];
   total: number;
}

export async function fetchCart(): Promise<FetchCartProps> {
   const { data } = await api.get<any>('/wc/store/v1/cart', 0);

   return {
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
   };
}

export async function addItemToCart(id: number, quantity: number): Promise<any> {
   return await api.post('/wc/store/v1/cart/add-item', { id, quantity });
}
