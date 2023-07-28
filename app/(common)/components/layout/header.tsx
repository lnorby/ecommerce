import { ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';
import { BackgroundImage } from '@/app/(common)/components/background-image';

export interface HeaderProps {
   centered?: boolean;
   children?: ReactNode;
}

export function Header({ centered = false, children }: HeaderProps) {
   return (
      <header className="relative pt-[8rem] pb-[3.125rem]">
         <BackgroundImage src="/bg.png" imagePosition="top" fillColor="#fff8f0" />
         <div className="container">
            <div
               className={twMerge(
                  centered ? 'flex flex-col items-center mx-auto text-center' : 'max-w-[40rem]'
               )}
            >
               {children}
            </div>
         </div>
      </header>
   );
}
