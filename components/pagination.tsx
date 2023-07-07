'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PaginationProps {
   activePage: number;
   totalPages: number;
}

export default function Pagination({ activePage, totalPages }: PaginationProps) {
   const searchParams = useSearchParams();

   if (totalPages === 1) {
      return;
   }

   return (
      <ul className="flex space-x-2">
         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li className="" key={page}>
               {page === activePage ? (
                  <button type="button" className="font-bold" disabled>
                     {page}
                  </button>
               ) : (
                  <Link href={{ query: { ...Object.fromEntries(searchParams.entries()), page } }}>
                     {page}
                  </Link>
               )}
            </li>
         ))}
      </ul>
   );
}
