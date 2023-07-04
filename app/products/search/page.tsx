'use client';

import { useRouter } from 'next/navigation';

import { fetchProducts } from '@/modules/product/api';
import ProductList from '@/modules/product/ProductList';
import Heading from '@/components/Heading';
import Pagination from '@/components/Pagination';

interface ProductSearchPageProps {
   searchParams: {
      q: string;
      page?: string;
   };
}

export default async function ProductSearchPage({ searchParams }: ProductSearchPageProps) {
   const router = useRouter();
   const page = searchParams.page ? parseInt(searchParams.page) : 1;

   const productsResponse = await fetchProducts({
      filters: { search: searchParams.q },
      perPage: 20,
      page,
   });

   return (
      <div className="container">
         <Heading as="h1" style="h1" className="mb-5">
            Keresés: {searchParams.q}
         </Heading>
         {productsResponse.products ? (
            <>
               <ProductList products={productsResponse.products} layoutSelectable={true} />
               <Pagination
                  activePage={page}
                  totalPages={productsResponse.totalPages}
                  onChange={(page) =>
                     router.push(`/products/search?q=${searchParams.q}&page=${page}`)
                  }
               />
            </>
         ) : (
            <p>Nincs találat.</p>
         )}
      </div>
   );
}
