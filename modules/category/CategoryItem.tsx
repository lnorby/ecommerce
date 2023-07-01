import Image from 'next/image';
import Link from 'next/link';

import { Category } from '@/modules/category/models';

interface CategoryItemProps {
   category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
   return (
      <div>
         {/*{category.image && (*/}
         {/*   <Image*/}
         {/*      src={category.image}*/}
         {/*      width={300}*/}
         {/*      height={300}*/}
         {/*      className="w-[300px] h-[300px] object-cover"*/}
         {/*      alt={category.name}*/}
         {/*   />*/}
         {/*)}*/}
         <Link href={category.url}>{category.name}</Link>
      </div>
   );
}
