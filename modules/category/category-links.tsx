import Link from 'next/link';

import { fetchCategories } from '@/modules/category/api';

interface CategoryLinksProps {}

export default async function CategoryLinks({}: CategoryLinksProps) {
   const productCategories = await fetchCategories();

   return (
      <>
         {productCategories.map((category) => (
            <Link href={`/products/categories/${category.slug}/${category.id}`} key={category.id}>
               {category.name}
            </Link>
         ))}
      </>
   );
}
