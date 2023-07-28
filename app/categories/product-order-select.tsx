'use client';

import { FaCaretDown } from 'react-icons/fa';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

const QUERY_KEY = 'orderby';

export interface ProductOrderSelectProps {}

export function ProductOrderSelect({}: ProductOrderSelectProps) {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   function onChange(event: ChangeEvent<HTMLSelectElement>) {
      const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
      newSearchParams.set(QUERY_KEY, event.target.value);
      router.push(`${pathname}?${newSearchParams}`, { scroll: false });
   }

   return (
      <div className="relative">
         <select
            className="w-full h-10 pl-4 pr-12 bg-soft hover:bg-[#ebedf0] font-medium text-muted appearance-none transition"
            defaultValue={searchParams.get(QUERY_KEY) ?? ''}
            onChange={onChange}
         >
            <option value="">Alapértelmezett rendezés</option>
            <option value="name_asc">Név szerint (A-Z)</option>
            <option value="name_desc">Név szerint (Z-A)</option>
            <option value="price_asc">Ár szerint növekvő</option>
            <option value="price_desc">Ár szerint csökkenő</option>
         </select>
         <FaCaretDown
            size={13}
            className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none"
         />
      </div>
   );
}
