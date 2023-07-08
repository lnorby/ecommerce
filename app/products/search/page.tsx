import { fetchProducts } from '@/modules/product/api';
import ProductList from '@/modules/product/product-list';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';

interface ProductSearchPageProps {
   searchParams: {
      q: string;
      page?: string;
   };
}

export default async function ProductSearchPage({ searchParams }: ProductSearchPageProps) {
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
         {productsResponse.products.length ? (
            <>
               <ProductList products={productsResponse.products} layoutSelectable={true} />
               <Pagination activePage={page} totalPages={productsResponse.totalPages} />
            </>
         ) : (
            <p>Nincs találat.</p>
         )}
      </div>
   );
}
