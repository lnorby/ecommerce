import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
   { className, children, ...props },
   ref
) {
   return (
      <textarea ref={ref} className={twMerge('w-full px-2 py-2 border', className)} {...props}>
         {children}
      </textarea>
   );
});
