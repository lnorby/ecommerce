import { fetchProducts } from '@/modules/product/api';
import { fetchCategories, fetchCategoryById } from '@/modules/category/api';
import Heading from '@/components/Heading';
import ProductList from '@/modules/product/ProductList';

interface ProductCategoryPageProps {
   params: {
      slug: string;
      id: number;
   };
   // searchParams: {
   //    page?: number;
   // };
}

export default async function ProductCategoryPage({ params }: ProductCategoryPageProps) {
   const category = await fetchCategoryById(params.id);
   const productsResponse = await fetchProducts({
      filters: {
         category: category.id,
      },
      perPage: 20,
      page: 1,
   });

   return (
      <div className="container">
         <Heading as="h1" style="h1" className="mb-5">
            {category.name}
         </Heading>
         <ProductList products={productsResponse.products} layoutSelectable={true} />
      </div>
   );
}

export async function generateStaticParams() {
   const categories = await fetchCategories();

   return categories.map((category) => ({
      slug: category.slug,
      id: category.id.toString(),
   }));
}
