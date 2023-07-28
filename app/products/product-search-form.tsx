'use client';

import { FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '@/app/(common)/components/form/input';
import { Button } from '@/app/(common)/components/ui/button';
import { twMerge } from 'tailwind-merge';

export interface ProductSearchFormProps {
   className?: string;
}

export function ProductSearchForm({ className }: ProductSearchFormProps) {
   const router = useRouter();
   const inputRef = useRef<HTMLInputElement | null>(null);

   function search(event: FormEvent) {
      event.preventDefault();
      router.push(`/search?q=${inputRef.current?.value}`);
   }

   return (
      <form className={twMerge('flex space-x-2', className)} onSubmit={(e) => search(e)}>
         <Input type="text" className="border" ref={inputRef} placeholder="termék keresés" />
         <Button variant="primary" size="md">
            Keresés
         </Button>
      </form>
   );
}
