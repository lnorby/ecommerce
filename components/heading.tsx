import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeadingProps {
   as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
   style: 'h1' | 'h2' | 'h3';
   className?: string;
   children: ReactNode;
}

export default function Heading({ as: Component, style, className, children }: HeadingProps) {
   return (
      <Component className={twMerge(style === 'h1' && 'text-lg font-bold', className)}>
         {children}
      </Component>
   );
}
