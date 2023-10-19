import { apiRequest } from '@/app/(common)/lib/api';

export async function createCheckout(variantId: string, quantity: number): Promise<string> {
   const response = await apiRequest(
      `mutation CreateCheckout($variantId: ID!, $quantity: Int!) {
         checkoutCreate(
            input: {
               lines: {
                  variantId: $variantId,
                  quantity: $quantity
               },
            }
         ) {
            checkout {
               id
            }
         }
      }`,
      {
         variantId,
         quantity,
      }
   );

   return response.data.checkoutCreate.checkout.id;
}

export async function fetchCheckout(id: string): Promise<Checkout> {
   const {
      data: { checkout },
   } = await apiRequest(
      `query GetCheckout($id: ID) {
         checkout(id: $id) {
            id,
            lines {
               id
               quantity
               unitPrice {
                  gross {
                     amount
                     currency
                  }
               }
               totalPrice {
                  gross {
                     amount
                     currency
                  }
               }
               variant {
                  product {
                     id
                     slug
                     name
                     media {
                        url
                     }
                  }
               }
            }
            totalPrice {
               gross {
                  amount
                  currency
               }
            }
            subtotalPrice {
               gross {
                  amount
                  currency
               }
            }
            availablePaymentGateways {
               id
               name
            }
         }
      }`,
      { id }
   );

   return {
      id: checkout.id,
      lines: checkout.lines.map((line: any) => ({
         id: line.id,
         product: {
            id: line.variant.product.id,
            name: line.variant.product.name,
            slug: line.variant.product.slug,
            image: line.variant.product.media[0]?.url,
         },
         quantity: line.quantity,
         unitPrice: line.unitPrice.gross.amount,
         totalPrice: line.totalPrice.gross.amount,
      })),
      subtotal: checkout.subtotalPrice.gross.amount,
      total: checkout.totalPrice.gross.amount,
      availablePaymentGateways: checkout.availablePaymentGateways.map((gateway: any) => ({
         id: gateway.id,
         name: gateway.name,
      })),
   };
}

export async function addCheckoutLine(
   checkoutId: string,
   variantId: string,
   quantity: number
): Promise<void> {
   await apiRequest(
      `mutation AddCheckoutLine($checkoutId: ID, $variantId: ID!, $quantity: Int!) {
         checkoutLinesAdd(
            id: $checkoutId,
            lines: {
               variantId: $variantId
               quantity: $quantity,
            }
         ) {
            checkout {
               id
            }
         }
      }`,
      {
         checkoutId,
         variantId,
         quantity,
      }
   );
}

export async function updateCheckoutLine(
   checkoutId: string,
   lineId: string,
   quantity: number
): Promise<void> {
   await apiRequest(
      `mutation UpdateCheckoutLine($checkoutId: ID, $lineId: ID, $quantity: Int) {
         checkoutLinesUpdate(
            id: $checkoutId,
            lines: {
               lineId: $lineId,
               quantity: $quantity
            }
         ) {
            checkout {
               id
            }
         }
      }`,
      {
         checkoutId,
         lineId,
         quantity,
      }
   );
}

export async function deleteCheckoutLine(checkoutId: string, lineId: string): Promise<void> {
   await apiRequest(
      `mutation DeleteCheckoutLine($checkoutId: ID, $lineId: ID!) {
         checkoutLinesDelete(
            id: $checkoutId,
            linesIds: [$lineId]
         ) {
            checkout {
               id
            }
         }
      }`,
      {
         checkoutId,
         lineId,
      }
   );
}
