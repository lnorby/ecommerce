'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';

import { fetchProducts } from '@/modules/product/api';
import ProductList from '@/modules/product/ProductList';
import Heading from '@/components/Heading';

interface ProductSearchPageProps {}

export default function ProductSearchPage({}: ProductSearchPageProps) {
   // TODO: pagination
   const searchParams = useSearchParams();
   const searchQuery = searchParams.get('q') as string;

   const { isLoading, data: products } = useQuery({
      queryFn: () => fetchProducts({ filters: { search: searchQuery } }),
      queryKey: ['search-products', searchQuery],
   });

   return (
      <div className="container">
         <Heading as="h1" style="h1" className="mb-5">
            Keresés: {searchQuery}
         </Heading>
         {isLoading ? (
            <p>Egy pillanat...</p>
         ) : products ? (
            <ProductList products={products} layoutSelectable={true} />
         ) : (
            <p>Nincs találat.</p>
         )}
      </div>
   );
}
