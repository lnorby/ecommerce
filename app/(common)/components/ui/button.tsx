import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonVariants {
   variant: 'primary';
   size?: 'md' | 'lg';
}

export interface ButtonProps extends ComponentPropsWithoutRef<'button'>, ButtonVariants {}

export function Button({
   className,
   children,
   type = 'button',
   variant,
   size,
   ...props
}: ButtonProps) {
   return (
      <button
         type={type}
         className={twMerge(buttonVariants({ variant, size }), className)}
         {...props}
      >
         {children}
      </button>
   );
}

export function buttonVariants({ variant, size }: ButtonVariants) {
   return twMerge(
      'inline-flex items-center justify-center font-medium text-center cursor-pointer transition',
      size === 'md' && 'px-7 py-3',
      size === 'lg' && 'px-8 py-3 text-lg',
      variant === 'primary' && 'bg-accent-primary hover:bg-[#1a1a1a] text-inverted'
   );
}
