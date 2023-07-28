import { ReactNode } from 'react';

import { fetchAttributes, fetchProducts } from '@/app/products/api';
import { fetchCategories, fetchCategoryById } from '@/app/categories/api';
import { AttributeTermSelect } from '@/app/categories/attribute-term-select';
import { Pagination } from '@/app/(common)/components/ui/pagination';
import { Header } from '@/app/(common)/components/layout/header';
import { Heading } from '@/app/(common)/components/ui/heading';
import { ProductOrderSelect } from '@/app/categories/product-order-select';
import { ProductItem } from '@/app/(common)/components/product-item';

interface ProductCategoryPageProps {
   params: {
      slug: string;
      id: string;
   };
   searchParams: {
      page?: string;
      orderby?: string;
      attributes?: string;
   };
}

export default async function ProductCategoryPage({
   params,
   searchParams,
}: ProductCategoryPageProps) {
   const category = await fetchCategoryById(Number(params.id));
   const attributes = await fetchAttributes();

   const page = Number(searchParams.page ?? 1);

   let orderBy;
   let order;

   switch (searchParams.orderby) {
      case 'name_asc':
         orderBy = 'title';
         order = 'asc';
         break;
      case 'name_desc':
         orderBy = 'title';
         order = 'desc';
         break;
      case 'price_asc':
         orderBy = 'price';
         order = 'asc';
         break;
      case 'price_desc':
         orderBy = 'price';
         order = 'desc';
         break;
      default:
         orderBy = 'date';
         order = 'asc';
   }

   const attributesFilter = searchParams.attributes ? JSON.parse(searchParams.attributes) : {};

   const productsResponse = await fetchProducts({
      filters: {
         category: category.id,
      },
      orderBy,
      order,
      perPage: 20,
      page,
   });

   return (
      <>
         <Header>
            <Heading as="h1" style="h1" separator>
               {category.name}
            </Heading>
            {category.description && (
               <p className="mt-6 text-lg leading-normal">{category.description}</p>
            )}
         </Header>
         <div className="flex container py-12 space-x-12">
            <main className="flex-1">
               <div className="flex items-center justify-between mb-8">
                  <div className="font-bold">13–24, összesen: 36</div>
                  <ProductOrderSelect />
               </div>
               {productsResponse.products.length ? (
                  <div className="grid grid-cols-3 gap-x-8 gap-y-12">
                     {productsResponse.products.map((product) => (
                        <ProductItem product={product} key={product.id} />
                     ))}
                  </div>
               ) : (
                  <p>Nincs ilyen termék.</p>
               )}
               <Pagination totalPages={3} className="mt-20" />
            </main>
            <aside className="w-[19rem] shrink-0 space-y-4">
               {/*<Card title="Ár"></Card>*/}
               {attributes.map((attribute) => (
                  <Card title={attribute.name} key={attribute.id}>
                     <AttributeTermSelect attribute={attribute} />
                  </Card>
               ))}
            </aside>
         </div>
      </>
   );
}

interface CardProps {
   title: string;
   children: ReactNode;
}

function Card({ title, children }: CardProps) {
   return (
      <div className="px-8 py-7 bg-soft">
         <h3 className="mb-5 text-sm font-bold uppercase tracking-wider">{title}</h3>
         {children}
      </div>
   );
}

export async function generateStaticParams() {
   const categories = await fetchCategories();

   return categories.map((category) => ({
      slug: category.slug,
      id: String(category.id),
   }));
}

export async function generateMetadata({ params }: ProductCategoryPageProps) {
   const category = await fetchCategoryById(Number(params.id));

   return {
      title: category.name,
   };
}
