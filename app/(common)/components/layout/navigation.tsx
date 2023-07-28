import Link from 'next/link';

import { siteConfig } from '@/app/(common)/config/site';
import { fetchCategories } from '@/app/categories/api';
import { ProductSearchForm } from '@/app/products/product-search-form';
import { CartButton } from '@/app/(common)/components/cart-button';

export interface NavigationProps {}

export async function Navigation({}: NavigationProps) {
   const productCategories = await fetchCategories();

   return (
      <nav className="flex items-center justify-between">
         <Link href="/" className="text-4xl font-bold">
            {siteConfig.name}
         </Link>
         <div className="flex items-center space-x-10">
            <div className="flex">
               {productCategories.map((category) => (
                  <Link
                     href={`/categories/${category.slug}/${category.id}`}
                     className="px-5 py-4 font-bold tracking-wider text-[#212529] transition hover:text-accent-primary"
                     key={category.id}
                  >
                     {category.name}
                  </Link>
               ))}
            </div>
            {/*<ProductSearchForm className="ml-[100px] mr-[50px]" />*/}
            <CartButton />
            {/*<Link href="/contact">Kapcsolat</Link>*/}
         </div>
      </nav>
   );
}
