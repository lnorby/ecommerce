import { apiRequest } from '@/app/(common)/lib/api';
import { convertDescriptionToHtml } from '@/app/(common)/utils/convert-description-to-html';

export async function fetchCategoryBySlug(slug: string): Promise<Category> {
   const {
      data: { category },
   } = await apiRequest(
      `query GetCategoryBySlug($slug: String) {
         category(slug: $slug) {
            id
            name
            slug
            description
         }
      }`,
      {
         slug,
      },
      3600
   );

   return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: convertDescriptionToHtml(category.description),
   };
}

export async function fetchCategories(): Promise<Category[]> {
   const response = await apiRequest(
      `query GetCategories {
         categories(first: 100) {
            edges {
               node {
                  id
                  name
                  slug
                  description
               }
            }
         }
      }`,
      {},
      3600
   );

   return response.data.categories.edges.map(({ node: categoryData }: any) => ({
      id: categoryData.id,
      name: categoryData.name,
      slug: categoryData.slug,
      description: convertDescriptionToHtml(categoryData.description),
   }));
}
