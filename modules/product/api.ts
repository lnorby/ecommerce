import { api } from '@/lib/api';
import { Product } from '@/modules/product/models';

export async function fetchProductById(id: number): Promise<Product> {
   return await api.get<any>(`/wc/v3/products/${id}`).then(
      (productData) =>
         new Product({
            id: productData.id,
            name: productData.name,
            slug: productData.slug,
            price: productData.price,
            images: productData.images?.map((imageData: any) => imageData.src) ?? [],
         })
   );
}

interface FetchProductsFilters {
   search?: string;
   featured?: boolean;
   category?: number;
   onSale?: boolean;
}

interface FetchProductsProps {
   filters?: FetchProductsFilters;
   orderBy?: 'date' | 'id' | 'title' | 'price' | 'popularity' | 'rating';
   order?: 'asc' | 'desc';
   page?: number;
   perPage?: number;
}

export async function fetchProducts({
   filters = {},
   orderBy = 'date',
   order = 'asc',
   page = 1,
   perPage = 30,
}: FetchProductsProps = {}): Promise<Product[]> {
   const urlParams = new URLSearchParams();

   urlParams.append('search', filters?.search?.toString() ?? '');
   urlParams.append('featured', filters?.featured ? '1' : '0');
   urlParams.append('category', filters?.category?.toString() ?? '');
   urlParams.append('featured', filters?.onSale ? '1' : '0');
   urlParams.append('orderby', orderBy.toString());
   urlParams.append('order', order.toString());
   urlParams.append('page', page.toString());
   urlParams.append('per_page', perPage.toString());

   return await api.get<any[]>(`/wc/v3/products?${urlParams.toString()}`).then((response) => {
      return response.map(
         (productData) =>
            new Product({
               id: productData.id,
               name: productData.name,
               slug: productData.slug,
               price: productData.price,
               images: productData.images?.map((imageData: any) => imageData.src) ?? [],
            })
      );
   });
}