import { ReactNode } from 'react';
import Link from 'next/link';

import { inter } from '@/app/fonts';
import Providers from '@/app/providers';
import { fetchCategories } from '@/modules/category/api';
import CategoryItem from '@/modules/category/CategoryItem';
import ProductSearchForm from '@/components/ProductSearchForm';

import '@/styles/globals.css';

export const metadata = {
   title: 'eCommerce',
   description: '',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
   const productCategories = await fetchCategories();

   return (
      <html lang="hu" className={`${inter.variable}`}>
         <body className="font-primary leading-tight text-normal">
            <header className="flex justify-between container mb-6 py-5">
               <nav className="flex flex-1 justify-between">
                  <Link href="/">eCommerce logó</Link>
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
