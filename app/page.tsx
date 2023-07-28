import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { Heading } from '@/app/(common)/components/ui/heading';
import { TopProducts } from '@/app/(common)/components/top-products';
import { buttonVariants } from '@/app/(common)/components/ui/button';
import { BackgroundImage } from '@/app/(common)/components/background-image';

export default function HomePage() {
   return (
      <main>
         <section className="relative">
            <BackgroundImage src="/hero-bg.png" fillColor="#f8f9fa" />
            <div className="container-sm flex items-center justify-between pt-[10rem]">
               <div className="max-w-[33rem]">
                  <Heading as="h1" style="h1" separator>
                     Szeretjük a jó kávét
                  </Heading>
                  <p className="my-6 text-lg leading-normal">
                     Vannak emberek, akik nem tudják elkezdeni a napjukat egy csésze frissen főzött
                     kávé nélkül. Mi megértjük őket.
                  </p>
                  <Link
                     href="/"
                     className={twMerge(
                        buttonVariants({ variant: 'primary', size: 'md' }),
                        'min-h-[3.5rem] font-bold text-sm uppercase tracking-[1.5px]'
                     )}
                  >
                     Rendelj most
                  </Link>
               </div>
               <Image src="/hero-image.png" width={522} height={620} alt="" />
            </div>
         </section>

         <section className="container-sm py-24">
            <div className="max-w-[34rem] mx-auto mb-14">
               <Heading as="h2" style="h2" centered separator>
                  Top termékek
               </Heading>
               <p className="mt-6 text-lg leading-normal text-center">
                  Mindenkinek van egy kedvenc kávéja. A mi vásárlóink ezeket szeretik a legjobban.
               </p>
            </div>
            <Suspense>
               <TopProducts />
            </Suspense>
         </section>
      </main>
   );
}
