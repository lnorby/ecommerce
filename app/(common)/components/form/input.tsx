import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
   { className, type = 'text', ...props },
   ref
) {
   return (
      <input
         type={type}
         ref={ref}
         className={twMerge(
            'w-full pl-4 h-12 border border-soft bg-white hover:border-accent-primary focus:border-accent-primary transition',
            type === 'number' ? 'pr-2' : 'pr-4',
            className
         )}
         {...props}
      />
   );
});
