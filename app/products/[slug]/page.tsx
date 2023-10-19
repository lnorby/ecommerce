import Image from 'next/image';

import { fetchProductBySlug, fetchProducts } from '@/app/products/api';
import { formatPrice } from '@/app/(common)/utils/format-price';
import { Header } from '@/app/(common)/components/layout/header';
import { Heading } from '@/app/(common)/components/ui/heading';
import { AddToCartForm } from '@/app/products/add-to-cart-form';
import { Breadcrumbs } from '@/app/(common)/components/ui/breadcrumbs';
import { TopProducts } from '@/app/(common)/components/top-products';

interface ProductPageProps {
   params: {
      slug: string;
   };
}

export default async function ProductPage({ params }: ProductPageProps) {
   // TODO: similar products instead of tops
   const product = await fetchProductBySlug(params.slug);

   return (
      <>
         <Header centered>
            <Heading as="h1" style="h3">
               {product.name}
            </Heading>
            <Breadcrumbs
               items={[
                  {
                     label: 'Nyitóoldal',
                     url: '/',
                  },
                  {
                     label: product.category.name,
                     url: `/categories/${product.category.slug}`,
                  },
                  { label: product.name },
               ]}
               className="mt-8"
            />
         </Header>
         <div className="container-sm py-12">
            <main>
               <div className="flex space-x-12">
                  <div className="flex-1 max-w-[500px]">
                     <div className="relative pt-[100%]">
                        {product.images.map((image) => (
                           <Image src={image} fill alt={product.name} key={image} priority />
                        ))}
                     </div>
                  </div>
                  <div className="flex-1 p-12 bg-soft">
                     <div className="mb-2">{product.inStock ? 'raktáron' : 'nincs raktáron'}</div>
                     <div className="mb-5 font-bold">
                        {product.onSale && (
                           <del className="block text-muted">
                              {formatPrice(product.regularPrice)}
                           </del>
                        )}
                        <span className="text-4xl text-accent-primary">
                           {formatPrice(product.price)}
                        </span>
                     </div>
                     <ul className="mb-8 p-6 bg-strong">
                        {product.attributes.map((attribute) => (
                           <li
                              className="flex justify-between py-2.5 border-b last:border-b-0 border-[rgba(0,0,0,0.05)]"
                              key={attribute.id}
                           >
                              <span className="mr-2 text-muted">{attribute.name}:</span>
                              <strong className="text-right">{attribute.values.join(', ')}</strong>
                           </li>
                        ))}
                        {/*<li className="flex justify-between py-2.5">*/}
                        {/*   <span className="mr-2 text-muted">Várható kiszállítás:</span>*/}
                        {/*   <strong className="text-right">2023.08.20.</strong>*/}
                        {/*</li>*/}
                     </ul>
                     <AddToCartForm variantId={product.variantId} />
                  </div>
               </div>
               <Heading as="h2" style="h4" className="mt-10 mb-8">
                  Leírás
               </Heading>
               <div
                  className="prose max-w-full"
                  dangerouslySetInnerHTML={{
                     __html: product.description,
                  }}
               ></div>
            </main>
            <aside className="mt-20">
               <Heading as="h2" style="h4" className="mb-10">
                  Hasonló termékek
               </Heading>
               <TopProducts />
            </aside>
         </div>
      </>
   );
}

export async function generateStaticParams() {
   const productsResponse = await fetchProducts();

   return productsResponse.products.map((product) => ({
      slug: product.slug,
   }));
}

export async function generateMetadata({ params }: ProductPageProps) {
   const product = await fetchProductBySlug(params.slug);

   return {
      title: product.name,
   };
}
