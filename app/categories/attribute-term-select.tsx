'use client';

import { FormEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';

import { fetchAttributeTerms } from '@/app/products/api';
import { Choice } from '@/app/(common)/components/form/choice';

export interface AttributeTermSelectProps {
   attribute: Attribute;
}

export function AttributeTermSelect({ attribute }: AttributeTermSelectProps) {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const { data: terms } = useQuery(['attributeTerms', attribute.id], () =>
      fetchAttributeTerms(attribute.id)
   );

   const searchParamsObj = Object.fromEntries(searchParams.entries());
   const selectedTerms = searchParamsObj.attributes
      ? JSON.parse(searchParamsObj.attributes)[attribute.slug] ?? []
      : [];

   function onChange(event: FormEvent<HTMLInputElement>, term: AttributeTerm) {
      const newSelectedTerms = event.target.checked
         ? [...selectedTerms, term.id]
         : selectedTerms.filter((item) => item.id !== term.id);

      const newSearchParams = {
         ...searchParamsObj,
         page: 1,
         attributes: JSON.stringify({
            ...JSON.parse(searchParamsObj.attributes ?? '{}'),
            [attribute.slug]: newSelectedTerms,
         }),
      };

      router.push(`${pathname}?${new URLSearchParams(newSearchParams)}`, { scroll: false });
   }

   return (
      <div className="space-y-3">
         {terms?.map((term) => (
            <Choice
               type="checkbox"
               label={term.name}
               defaultChecked={selectedTerms.includes(term.id)}
               onChange={(e) => onChange(e, term)}
               key={term.id}
            />
         ))}
      </div>
   );
}
