import { apiRequest } from '@/utils/api';

export async function fetchCategoryById(id: number): Promise<Category> {
   return await apiRequest<any>(`/wc/v3/products/categories/${id}`).then(({ data }) => {
      return {
         id: data.id,
         name: data.name,
         slug: data.slug,
         parent: data.parent,
         image: data.image?.src ?? '',
      };
   });
}

export async function fetchCategories(parent?: number): Promise<Category[]> {
   return await apiRequest<any>(
      '/wc/v3/products/categories?exclude=16&_fields=id,name,slug,parent,image' +
         (parent ? `&parent=${parent}` : '')
   ).then((response) => {
      return response.data.map((categoryData: any) => ({
         id: categoryData.id,
         name: categoryData.name,
         slug: categoryData.slug,
         parent: categoryData.parent,
         image: categoryData.image?.src ?? '',
      }));
   });
}
