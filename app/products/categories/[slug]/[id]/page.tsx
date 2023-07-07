import { fetchProducts } from '@/modules/product/api';
import { fetchCategoryById } from '@/modules/category/api';
import Heading from '@/components/heading';
import ProductList from '@/modules/product/product-list';
import Pagination from '@/components/pagination';

interface ProductCategoryPageProps {
   params: {
      slug: string;
      id: number;
   };
   searchParams: {
      page?: string;
   };
}

export default async function ProductCategoryPage({
   params,
   searchParams,
}: ProductCategoryPageProps) {
   const category = await fetchCategoryById(params.id);
   const page = searchParams.page ? parseInt(searchParams.page) : 1;

   const productsResponse = await fetchProducts({
      filters: {
         category: category.id,
      },
      perPage: 20,
      page,
   });

   return (
      <div className="container">
         <Heading as="h1" style="h1" className="mb-5">
            {category.name}
         </Heading>
         <ProductList products={productsResponse.products} layoutSelectable={true} />
         <Pagination activePage={page} totalPages={productsResponse.totalPages} />
      </div>
   );
}

// export async function generateStaticParams() {
//    const categories = await fetchCategories();
//
//    return categories.map((category) => ({
//       slug: category.slug,
//       id: category.id.toString(),
//    }));
// }

export const revalidate = 3600;
