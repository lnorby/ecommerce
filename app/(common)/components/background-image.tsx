import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export interface BackgroundImageProps {
   src: string;
   fillColor?: string;
   imagePosition?: 'top' | 'center' | 'bottom';
   className?: string;
}

export function BackgroundImage({
   src,
   fillColor,
   imagePosition = 'center',
   className,
}: BackgroundImageProps) {
   return (
      <Image
         src={src}
         fill
         className={twMerge(
            `absolute inset-0 -z-50 object-cover`,
            imagePosition === 'top' && 'object-top',
            imagePosition === 'center' && 'object-center',
            imagePosition === 'bottom' && 'object-bottom',
            className
         )}
         style={{ backgroundColor: fillColor ?? 'transparent' }}
         alt=""
      />
   );
}
