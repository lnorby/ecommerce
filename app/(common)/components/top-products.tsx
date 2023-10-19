import { fetchProducts } from '@/app/products/api';

import { ProductItem } from '@/app/(common)/components/product-item';

export interface TopProductsProps {}

export async function TopProducts({}: TopProductsProps) {
   const topProductsResponse = await fetchProducts({
      orderBy: 'RATING',
      order: 'DESC',
      perPage: 3,
   });

   return (
      <div className="grid grid-cols-3 gap-x-8 gap-y-12">
         {topProductsResponse.products.map((product) => (
            <ProductItem product={product} key={product.id} />
         ))}
      </div>
   );
}
