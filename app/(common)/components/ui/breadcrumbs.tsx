import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export interface BreadcrumbsProps {
   className?: string;
   items: {
      label: string;
      url?: string;
   }[];
}

export function Breadcrumbs({ className, items }: BreadcrumbsProps) {
   return (
      <ul
         className={twMerge(
            'flex items-center flex-wrap text-xs font-medium uppercase tracking-wider',
            className
         )}
      >
         {items.map((item) => (
            <li
               className="flex items-center before:content-['/'] before:mx-2.5 first:before:content-none"
               key={item.label}
            >
               {item.url ? (
                  <Link
                     href={item.url}
                     className="px-3 py-1.5 text-inverted bg-accent-primary hover:bg-[#1a1a1a] transition"
                  >
                     {item.label}
                  </Link>
               ) : (
                  <span className="text-[#080808]">{item.label}</span>
               )}
            </li>
         ))}
      </ul>
   );
}
