import Product from '@/models/Product';

interface ProductProps {
   product: Product;
}

export default function Product({ product }: ProductProps) {
   return (
      <div>
         {product.name}
         <br />
         {product.price} Ft
      </div>
   );
}
