import getProducts from '@/lib/getProducts';
import Product from '@/components/Product';

export default async function HomePage() {
   const products = await getProducts();

   return (
      <main className="">
         {products.map((product) => (
            <Product product={product} key={product.id} />
         ))}
      </main>
   );
}
