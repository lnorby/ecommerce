import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface HeadingProps {
   as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
   style: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
   className?: string;
   children: ReactNode;
   centered?: boolean;
   separator?: boolean;
}

export function Heading({
   as: Component,
   style,
   className,
   children,
   centered = false,
   separator = false,
}: HeadingProps) {
   return (
      <>
         {separator && (
            <div
               className={twMerge(
                  'relative w-[100px] h-[1px] mb-5 bg-[#2b231d]',
                  centered && 'mx-auto'
               )}
            >
               <div className="absolute top-1/2 left-1/2 w-[10px] h-[10px] bg-[#2b231d] rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
         )}
         <Component
            className={twMerge(
               style === 'h1' &&
                  'font-secondary text-8xl font-semibold text-[#2b231d] leading-[1.15]',
               style === 'h2' &&
                  'font-secondary text-7xl font-semibold text-[#2b231d] leading-[1.15]',
               style === 'h3' && 'font-secondary text-6xl font-extrabold leading-tight',
               centered && 'text-center',
               style === 'h4' && 'text-4xl font-bold',
               style === 'h5' && 'text-xl font-bold',
               className
            )}
         >
            {children}
         </Component>
      </>
   );
}
