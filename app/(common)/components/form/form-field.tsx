import { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

export interface FormFieldProps {
   className?: string;
   children: ReactElement;
   label?: string;
   error?: string | undefined;
   required?: boolean;
}

// TODO: label problem
export function FormField({ className, children, label, error, required = false }: FormFieldProps) {
   return (
      <div className={className}>
         {label && (
            <span className={twMerge('block mb-3 font-medium', error ? 'text-error' : '')}>
               {label}
               {required && <span className="ml-1 font-normal text-[#d74544]">*</span>}
            </span>
         )}
         {children}
         {error && <p className="mt-2 text-sm text-error">{error}</p>}
      </div>
   );
}
