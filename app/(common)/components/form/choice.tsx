import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { FaCheck } from 'react-icons/fa';

export interface ChoiceProps extends ComponentPropsWithoutRef<'input'> {
   type: 'checkbox' | 'radio';
   label?: string;
}

export const Choice = forwardRef<HTMLInputElement, ChoiceProps>(function Choice(
   { type, className, label, ...props },
   ref
) {
   return (
      <label className={twMerge('flex items-center', className)}>
         <span className="relative">
            <input type={type} ref={ref} className="absolute inset-0 invisible peer" {...props} />
            <span
               className={twMerge(
                  'flex items-center justify-center w-[20px] h-[20px] border border-soft peer-checked:border-accent-primary bg-white peer-checked:bg-accent-primary text-inverted',
                  type === 'radio' && 'rounded-full'
               )}
            >
               <FaCheck size={12} />
            </span>
         </span>
         {label && <span className="ml-3">{label}</span>}
      </label>
   );
});
