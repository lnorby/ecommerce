import { api } from '@/utils/api';

export async function fetchProductById(id: number): Promise<Product> {
   const { data } = await api.get<any>(`/wc/v3/products/${id}`, 300);

   return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      price: data.price,
      images: data.images?.map((imageData: any) => imageData.src) ?? [],
   };
}

interface FetchProductsProps {
   filters?: {
      search?: string;
      featured?: boolean;
      category?: number;
      onSale?: boolean;
   };
   orderBy?: 'date' | 'id' | 'title' | 'price' | 'popularity' | 'rating';
   order?: 'asc' | 'desc';
   page?: number;
   perPage?: number;
}

interface FetchProductsResponse {
   products: Product[];
   totalPages: number;
}

export async function fetchProducts({
   filters = {},
   orderBy = 'date',
   order = 'asc',
   page = 1,
   perPage = 30,
}: FetchProductsProps = {}): Promise<FetchProductsResponse> {
   const urlParams = new URLSearchParams();

   urlParams.append('_fields', 'id,name,slug,price,images');
   urlParams.append('search', filters?.search?.toString() ?? '');
   urlParams.append('featured', filters?.featured ? '1' : '0');
   urlParams.append('category', filters?.category?.toString() ?? '');
   urlParams.append('featured', filters?.onSale ? '1' : '0');
   urlParams.append('orderby', orderBy.toString());
   urlParams.append('order', order.toString());
   urlParams.append('page', page.toString());
   urlParams.append('per_page', perPage.toString());

   const response = await api.get<any>(`/wc/v3/products?${urlParams.toString()}`, 300);

   return {
      products: response.data.map((productData: any) => ({
         id: productData.id,
         name: productData.name,
         slug: productData.slug,
         price: productData.price,
         images: productData.images?.map((imageData: any) => imageData.src) ?? [],
      })),
      totalPages: parseInt(response.headers.get('x-wp-totalpages') ?? ''),
   };
}
