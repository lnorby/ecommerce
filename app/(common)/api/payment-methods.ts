import { api } from '@/app/(common)/lib/api';

export async function fetchPaymentMethods(): Promise<PaymentMethod[]> {
   const { data } = await api.get<any>('/wc/v3/payment_gateways');

   return data
      .filter((gatewayData: any) => gatewayData.enabled)
      .map((gatewayData: any) => ({
         id: gatewayData.id,
         name: gatewayData.title,
         description: gatewayData.description,
      }));
}
