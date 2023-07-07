import { ReactNode } from 'react';
import Link from 'next/link';

import { inter } from '@/app/fonts';
import Providers from '@/app/providers';
import { siteConfig } from '@/config/site';
import { fetchCategories } from '@/modules/category/api';
import CategoryItem from '@/modules/category/category-item';
import ProductSearchForm from '@/components/product-search-form';

import '@/styles/globals.css';

export default async function RootLayout({ children }: { children: ReactNode }) {
   const productCategories = await fetchCategories();

   return (
      <html lang="hu" className={`${inter.variable}`}>
         <body className="font-primary leading-tight text-normal">
            <header className="flex justify-between container mb-6 py-5">
               <nav className="flex flex-1 justify-between">
                  <Link href="/">{siteConfig.name} logó</Link>
                  {productCategories.map((category) => (
                     <CategoryItem category={category} key={category.id} />
                  ))}
               </nav>
               <ProductSearchForm />
            </header>
            <Providers>{children}</Providers>
         </body>
      </html>
   );
}

export const metadata = {
   title: {
      template: `%s | ${siteConfig.name}`,
      default: siteConfig.name,
   },
   description: '',
};
