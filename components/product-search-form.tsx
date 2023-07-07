'use client';

import { FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ProductSearchFormProps {}

export default function ProductSearchForm({}: ProductSearchFormProps) {
   const router = useRouter();
   const inputRef = useRef<HTMLInputElement | null>(null);

   function search(event: FormEvent) {
      event.preventDefault();
      router.push(`/products/search?q=${inputRef.current?.value}`);
   }

   return (
      <form className="ml-[100px]" onSubmit={(e) => search(e)}>
         <input type="text" className="border" ref={inputRef} placeholder="termék keresés" />
         <button type="submit">Keresés</button>
      </form>
   );
}
