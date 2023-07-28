import { DM_Sans, Playfair_Display } from 'next/font/google';

export const fontDMSans = DM_Sans({
   weight: ['400', '500', '700'],
   subsets: ['latin'],
   variable: '--font-dm-sans',
   display: 'swap',
});

export const fontPlayfairDisplay = Playfair_Display({
   subsets: ['latin'],
   variable: '--font-playfair-display',
   display: 'swap',
});
