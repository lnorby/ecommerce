import { api } from '@/utils/api';

export async function fetchCategoryById(id: number): Promise<Category> {
   const { data } = await api.get<any>(`/wc/v3/products/categories/${id}`, 3600);

   return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      parent: data.parent,
      image: data.image?.src ?? '',
   };
}

export async function fetchCategories(parent?: number): Promise<Category[]> {
   const response = await api.get<any>(
      '/wc/v3/products/categories?exclude=16&_fields=id,name,slug,parent,image' +
         (parent ? `&parent=${parent}` : ''),
      3600
   );

   return response.data.map((categoryData: any) => ({
      id: categoryData.id,
      name: categoryData.name,
      slug: categoryData.slug,
      parent: categoryData.parent,
      image: categoryData.image?.src ?? '',
   }));
}
