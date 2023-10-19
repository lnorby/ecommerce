import { useCartStore } from '@/app/cart/store';
import { useQuery, useQueryClient } from 'react-query';
import {
   addCheckoutLine,
   createCheckout,
   deleteCheckoutLine,
   fetchCheckout,
   updateCheckoutLine,
} from '@/app/(common)/api/checkout';

const QUERY_KEY = 'checkout';

export function useCart() {
   const queryClient = useQueryClient();

   const { checkoutId, setCheckoutId } = useCartStore((state) => ({
      checkoutId: state.checkoutId,
      setCheckoutId: state.setCheckoutId,
   }));

   const { data: checkout } = useQuery(QUERY_KEY, () => fetchCheckout(checkoutId ?? ''), {
      enabled: typeof checkoutId !== 'undefined',
   });

   async function addItem(variantId: string, quantity: number) {
      if (typeof checkoutId === 'undefined') {
         const checkoutId = await createCheckout(variantId, quantity);
         setCheckoutId(checkoutId);
      } else {
         await addCheckoutLine(checkoutId, variantId, quantity);
      }

      queryClient.invalidateQueries(QUERY_KEY);
   }

   async function updateItem(lineId: string, quantity: number) {
      await updateCheckoutLine(checkoutId ?? '', lineId, quantity);

      queryClient.invalidateQueries(QUERY_KEY);
   }

   async function removeItem(lineId: string) {
      await deleteCheckoutLine(checkoutId ?? '', lineId);

      queryClient.invalidateQueries(QUERY_KEY);
   }

   return {
      items: checkout?.lines ?? [],
      subtotal: checkout?.subtotal ?? 0,
      total: checkout?.total ?? 0,
      availablePaymentGateways: checkout?.availablePaymentGateways ?? [],
      addItem,
      updateItem,
      removeItem,
   };
}
