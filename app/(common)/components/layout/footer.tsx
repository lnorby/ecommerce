import { siteConfig } from '@/app/(common)/config/site';
import { Button } from '@/app/(common)/components/ui/button';
import { BackgroundImage } from '@/app/(common)/components/background-image';

export interface FooterProps {}

export function Footer({}: FooterProps) {
   return (
      <footer className="relative">
         <BackgroundImage src="/bg.png" imagePosition="bottom" fillColor="#fff8f0" />
         <div className="container">
            <div className="flex pt-20 pb-12 space-x-20">
               <div className="flex-1">
                  <div className="mb-6 text-4xl font-bold">{siteConfig.name}</div>
                  <p className="leading-snug">
                     Vannak emberek, akik nem tudják elkezdeni a napjukat egy csésze frissen főzött
                     kávé nélkül. Mi megértjük őket.
                  </p>
               </div>
               <div className="flex-1">
                  <div className="mb-5 text-sm font-bold tracking-wider uppercase">Kapcsolat</div>
                  <div className="space-y-4 leading-snug">
                     <p>555 Arabica Springs Rd, Crawford, TN 38554</p>
                     <p>
                        Hívjon minket: <strong>+36 1 123 4567</strong>
                     </p>
                     <p>
                        <a href="mailto:coffo@company.com" className="hover:text-accent-primary">
                           caffeine@shop.com
                        </a>
                     </p>
                  </div>
               </div>
               <div className="flex-1">
                  <div className="mb-5 text-sm font-bold tracking-wider uppercase">Hírlevél</div>
                  <form className="flex h-[3.125rem] mb-5">
                     <input
                        type="text"
                        className="flex-1 bg-white px-6 py-3"
                        placeholder="E-mail címed"
                     />
                     <Button type="submit" variant="primary" className="w-[10rem] font-normal">
                        Feliratkozás
                     </Button>
                  </form>
                  <p className="text-sm leading-snug">
                     Íratkozz fel a hírlevelünkre, hogy elsőként értesülj legfrissebb híreinkről és
                     akcióinkról!
                  </p>
               </div>
            </div>
            <div className="py-6 text-sm opacity-60 border-t border-[rgba(0,0,0,.07)]">
               <p className="leading-normal">
                  Copyright © 2023 {siteConfig.name}. Minden jog fenntartva.
               </p>
            </div>
         </div>
      </footer>
   );
}
