import { api } from '@/app/(common)/lib/api';

export async function fetchProductById(id: number): Promise<Product> {
   const { data } = await api.get<any>(`/wc/v3/products/${id}`, 300);

   return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      regularPrice: data.regular_price,
      onSale: data.on_sale,
      inStock: data.stock_status === 'instock',
      categories: data.categories.map((category: any) => ({
         id: category.id,
         name: category.name,
         slug: category.slug,
      })),
      images: data.images?.map((imageData: any) => imageData.src) ?? [],
      attributes: data.attributes.map((attribute: any) => ({
         id: attribute.id,
         name: attribute.name,
         options: attribute.options,
      })),
   };
}

interface FetchProductsProps {
   filters?: {
      query?: string;
      category?: number;
      featured?: boolean;
   };
   orderBy?: 'date' | 'id' | 'include' | 'title' | 'slug' | 'price' | 'popularity' | 'rating';
   order?: 'asc' | 'desc';
   page?: number;
   perPage?: number;
}

interface FetchProductsResponse {
   products: ProductSummary[];
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

   urlParams.append('_fields', 'id,name,slug,price,regular_price,on_sale,images');

   if (typeof filters?.query !== 'undefined') {
      urlParams.append('search', filters.query);
   }

   if (typeof filters?.category !== 'undefined') {
      urlParams.append('category', String(filters.category));
   }

   if (typeof filters?.featured !== 'undefined') {
      urlParams.append('featured', filters.featured ? '1' : '0');
   }

   urlParams.append('orderby', String(orderBy));
   urlParams.append('order', String(order));
   urlParams.append('page', String(page));
   urlParams.append('per_page', String(perPage));
   console.log(urlParams.toString());

   const response = await api.get<any>(`/wc/v3/products?${urlParams}`, 300);

   return {
      products: response.data.map((productData: any) => ({
         id: productData.id,
         name: productData.name,
         slug: productData.slug,
         price: productData.price,
         regularPrice: productData.regular_price,
         onSale: productData.on_sale,
         image: productData.images[0]?.src,
      })),
      totalPages: Number(response.headers.get('x-wp-totalpages') ?? 1),
   };
}

export async function fetchAttributes(): Promise<Attribute[]> {
   const { data } = await api.get<any>(`/wc/v3/products/attributes`);

   return data.map((attributeData: any) => ({
      id: attributeData.id,
      name: attributeData.name,
      slug: attributeData.slug,
   }));
}

export async function fetchAttributeTerms(attribute: number): Promise<AttributeTerm[]> {
   const { data } = await api.get<any>(`/wc/v3/products/attributes/${attribute}/terms`);

   // TODO: ordering
   return data.map((termData: any) => ({
      id: termData.id,
      name: termData.name,
   }));
}
