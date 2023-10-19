'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Choice } from '@/app/(common)/components/form/choice';

export interface AttributeChoiceSelectProps {
   attribute: Attribute;
}

export function AttributeChoiceSelect({ attribute }: AttributeChoiceSelectProps) {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const searchParamsObj = Object.fromEntries(searchParams.entries());
   const selectedChoices = searchParamsObj.attributes
      ? JSON.parse(searchParamsObj.attributes)[attribute.slug] ?? []
      : [];

   function onChange(isChecked: boolean, choice: AttributeChoice) {
      const newSelectedChoices = isChecked
         ? [...selectedChoices, choice.slug]
         : selectedChoices.filter((item) => item !== choice.slug);

      const newSearchParams = {
         ...searchParamsObj,
         page: 1,
         attributes: JSON.stringify({
            ...JSON.parse(searchParamsObj.attributes ?? '{}'),
            [attribute.slug]: newSelectedChoices,
         }),
      };

      router.push(`${pathname}?${new URLSearchParams(newSearchParams)}`, { scroll: false });
   }

   return (
      <div className="space-y-3">
         {attribute.choices.map((choice) => (
            <Choice
               type="checkbox"
               label={choice.name}
               defaultChecked={selectedChoices.includes(choice.slug)}
               onChange={(e) => onChange(e.target.checked, choice)}
               key={choice.id}
            />
         ))}
      </div>
   );
}
