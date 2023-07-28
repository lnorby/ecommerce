import { api } from '@/app/(common)/lib/api';

export async function fetchCategoryById(id: number): Promise<Category> {
   const { data } = await api.get<any>(`/wc/v3/products/categories/${id}`, 3600);

   return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      parent: data.parent,
   };
}

export async function fetchCategories(parent?: number): Promise<Category[]> {
   const { data } = await api.get<any>(
      '/wc/v3/products/categories' + (parent ? `?parent=${parent}` : ''),
      3600
   );

   return data
      .sort((a: any, b: any) => (a.menu_order < b.menu_order ? -1 : 1))
      .map((categoryData: any) => ({
         id: categoryData.id,
         name: categoryData.name,
         slug: categoryData.slug,
         description: categoryData.description,
         parent: categoryData.parent,
      }));
}
