import '@/app/globals.css';

import { ReactNode } from 'react';

import { siteConfig } from '@/app/(common)/config/site';
import { fontDMSans, fontPlayfairDisplay } from '@/app/fonts';
import { Providers } from '@/app/providers';
import { Navigation } from '@/app/(common)/components/layout/navigation';
import { Footer } from '@/app/(common)/components/layout/footer';
import { CartDialog } from '@/app/cart/cart-dialog';

interface Props {
   children: ReactNode;
}

export default function RootLayout({ children }: Props) {
   return (
      <html lang="hu" className={`${fontDMSans.variable} ${fontPlayfairDisplay.variable}`}>
         <body className="flex flex-col min-h-screen font-primary leading-tight text-normal">
            <div className="absolute top-0 left-0 z-10 w-full">
               <div className="container py-5">
                  <Navigation />
               </div>
            </div>
            <Providers>{children}</Providers>
            <div className="mt-auto">
               <Footer />
            </div>
            <CartDialog />
         </body>
      </html>
   );
}

export const metadata = {
   title: {
      template: `%s | ${siteConfig.name}`,
      default: siteConfig.name,
   },
   description: '',
};
