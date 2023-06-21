import { api } from '@/lib/api';
import Product from '@/models/Product';

// TODO: search, filter, order
export default async function getProducts(): Promise<Product[]> {
   return await api.get<any>('/wc/v3/products').then((response) => {
      return response.map((productData) => new Product(productData));
   });
}
