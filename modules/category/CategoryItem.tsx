import Link from 'next/link';

interface CategoryItemProps {
   category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
   return (
      <div>
         <Link href={`/products/categories/${category.slug}/${category.id}`}>{category.name}</Link>
      </div>
   );
}
