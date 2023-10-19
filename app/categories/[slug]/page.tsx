import { ReactNode } from 'react';

import { fetchAttributes, fetchProducts } from '@/app/products/api';
import { fetchCategories, fetchCategoryBySlug } from '@/app/categories/api';
import { AttributeChoiceSelect } from '@/app/categories/attribute-choice-select';
import { Header } from '@/app/(common)/components/layout/header';
import { Heading } from '@/app/(common)/components/ui/heading';
import { ProductOrderSelect } from '@/app/categories/product-order-select';
import { ProductItem } from '@/app/(common)/components/product-item';

interface ProductCategoryPageProps {
   params: {
      slug: string;
   };
   searchParams: {
      orderby?: string;
      attributes?: string;
   };
}

// TODO: pagination
export default async function ProductCategoryPage({
   params,
   searchParams,
}: ProductCategoryPageProps) {
   const category = await fetchCategoryBySlug(params.slug);
   const attributes = await fetchAttributes();

   let orderBy;
   let order;

   switch (searchParams.orderby) {
      case 'name_asc':
         orderBy = 'NAME';
         order = 'ASC';
         break;
      case 'name_desc':
         orderBy = 'NAME';
         order = 'DESC';
         break;
      case 'price_asc':
         orderBy = 'PRICE';
         order = 'ASC';
         break;
      case 'price_desc':
         orderBy = 'PRICE';
         order = 'DESC';
         break;
      default:
         orderBy = 'NAME';
         order = 'ASC';
   }

   const attributesFilter = searchParams.attributes ? JSON.parse(searchParams.attributes) : {};

   const productsResponse = await fetchProducts({
      filters: {
         category: category.id,
      },
      orderBy,
      order,
      perPage: 20,
   });

   return (
      <>
         <Header>
            <Heading as="h1" style="h1" separator>
               {category.name}
            </Heading>
            {category.description && (
               <div
                  className="mt-6 text-lg leading-normal"
                  dangerouslySetInnerHTML={{
                     __html: category.description,
                  }}
               ></div>
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
            </main>
            <aside className="w-[19rem] shrink-0 space-y-4">
               {/*<Card title="Ár"></Card>*/}
               {attributes.map((attribute) => (
                  <Card title={attribute.name} key={attribute.id}>
                     <AttributeChoiceSelect attribute={attribute} />
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
   }));
}

export async function generateMetadata({ params }: ProductCategoryPageProps) {
   const category = await fetchCategoryBySlug(params.slug);

   return {
      title: category.name,
   };
}
