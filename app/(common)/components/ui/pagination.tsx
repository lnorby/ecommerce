'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';
import { LiaLongArrowAltLeftSolid, LiaLongArrowAltRightSolid } from 'react-icons/lia';

const QUERY_KEY = 'page';

export interface PaginationProps {
   className?: string;
   totalPages: number;
}

export function Pagination({ className, totalPages }: PaginationProps) {
   const searchParams = useSearchParams();

   if (totalPages === 1) {
      return;
   }

   const activePage = Number(searchParams.get(QUERY_KEY) ?? 1);

   return (
      <ul className={twMerge('flex justify-center space-x-2 text-lg font-bold', className)}>
         {activePage > 1 && (
            <li>
               <PaginationButton page={activePage - 1}>
                  <LiaLongArrowAltLeftSolid size={19} />
               </PaginationButton>
            </li>
         )}
         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
               {page === activePage ? (
                  <button
                     type="button"
                     className="flex items-center justify-center h-[2.375rem] px-4 bg-light"
                     disabled
                  >
                     {page}
                  </button>
               ) : (
                  <PaginationButton page={page}>{page}</PaginationButton>
               )}
            </li>
         ))}
         {activePage < totalPages && (
            <li>
               <PaginationButton page={activePage + 1}>
                  <LiaLongArrowAltRightSolid size={19} />
               </PaginationButton>
            </li>
         )}
      </ul>
   );
}

interface PaginationButtonProps {
   page: number;
   children: ReactNode;
}

function PaginationButton({ page, children }: PaginationButtonProps) {
   const searchParams = useSearchParams();

   return (
      <Link
         href={{ query: { ...Object.fromEntries(searchParams.entries()), [QUERY_KEY]: page } }}
         className="flex items-center justify-center h-[2.375rem] px-4 text-muted bg-light hover:bg-soft transition"
      >
         {children}
      </Link>
   );
}
