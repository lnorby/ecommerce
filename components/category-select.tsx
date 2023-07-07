import { fetchCategories } from '@/modules/category/api';

interface CategorySelectProps {}

export default async function CategorySelect({}: CategorySelectProps) {
   const categories = await fetchCategories();

   return (
      <select>
         {categories.map((category) => (
            <option value={category.id} key={category.id}>
               {category.name}
            </option>
         ))}
      </select>
   );
}
