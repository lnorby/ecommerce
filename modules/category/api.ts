import { api } from '@/lib/api';
import { Category } from '@/modules/category/models';

export async function fetchCategoryById(id: number): Promise<Category> {
   return await api.get<any>(`/wc/v3/products/categories/${id}`).then((response) => {
      return new Category({
         id: response.id,
         name: response.name,
         slug: response.slug,
         parent: response.parent,
         description: response.description,
         image: response.image?.src ?? '',
      });
   });
}

export async function fetchCategories(parent?: number): Promise<Category[]> {
   return await api
      .get<any[]>('/wc/v3/products/categories?exclude=16' + (parent ? `&parent=${parent}` : ''))
      .then((response) => {
         return response.map(
            (productCategoryData) =>
               new Category({
                  id: productCategoryData.id,
                  name: productCategoryData.name,
                  slug: productCategoryData.slug,
                  parent: productCategoryData.parent,
                  description: productCategoryData.description,
                  image: productCategoryData.image?.src ?? '',
               })
         );
      });
}
