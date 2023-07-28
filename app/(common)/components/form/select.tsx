import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SelectProps extends ComponentPropsWithoutRef<'select'> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
   { className, children, ...props },
   ref
) {
   return (
      <div className={twMerge(className)}>
         <select ref={ref} className="w-full h-[40px] pl-1 border" {...props}>
            {children}
         </select>
      </div>
   );
});
