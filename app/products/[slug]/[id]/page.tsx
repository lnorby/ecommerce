import { Suspense } from 'react';
import Image from 'next/image';

import { fetchProductById, fetchProducts } from '@/modules/product/api';
import Heading from '@/components/heading';
import Price from '@/components/price';
import CategorySelect from '@/components/category-select';

interface ProductPageProps {
   params: {
      slug: string;
      id: number;
   };
}

export default async function ProductPage({ params }: ProductPageProps) {
   const product = await fetchProductById(params.id);

   return (
      <div className="container flex space-x-10">
         <div className="flex-1 max-w-[500px]">
            <div className="relative pt-[75%]">
               {product.images.map((image) => (
                  <Image
                     src={image}
                     fill
                     objectFit="cover"
                     alt={product.name}
                     key={image}
                     priority
                  />
               ))}
            </div>
         </div>
         <div className="flex-1">
            <Heading as="h1" style="h1" className="mb-5">
               {product.name}
            </Heading>
            <Price amount={product.price} />
            <Suspense fallback={<p>Betöltés...</p>}>
               <CategorySelect />
            </Suspense>
         </div>
      </div>
   );
}

export async function generateStaticParams() {
   const productsResponse = await fetchProducts();

   return productsResponse.products.map((product) => ({
      slug: product.slug,
      id: product.id.toString(),
   }));
}

export async function generateMetadata({ params }: ProductPageProps) {
   const product = await fetchProductById(params.id);

   return {
      title: product.name,
   };
}
