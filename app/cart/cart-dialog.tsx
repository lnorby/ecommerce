'use client';

import { shallow } from 'zustand/shallow';
import * as Dialog from '@radix-ui/react-dialog';
import { TbX } from 'react-icons/tb';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { formatPrice } from '@/app/(common)/utils/format-price';
import { useCartStore } from '@/app/cart/store';
import { Input } from '@/app/(common)/components/form/input';
import { Button, buttonVariants } from '@/app/(common)/components/ui/button';
import Link from 'next/link';

export interface CartDialogProps {}

export function CartDialog({}: CartDialogProps) {
   const { isDialogOpen, closeDialog, items, total, isUpdating, updateItem, removeItem } =
      useCartStore(
         (state) => ({
            isDialogOpen: state.isDialogOpen,
            closeDialog: state.closeDialog,
            items: state.items,
            total: state.total,
            isUpdating: state.isUpdating,
            updateItem: state.updateItem,
            removeItem: state.removeItem,
         }),
         shallow
      );

   return (
      <Dialog.Root open={isDialogOpen}>
         <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.7)]" />
            <Dialog.Content
               className="fixed top-1/2 left-1/2 w-full max-w-[55rem] max-h-[85vh] p-10 bg-white -translate-x-1/2 -translate-y-1/2 overflow-y-auto"
               onPointerDownOutside={closeDialog}
            >
               <button
                  type="button"
                  className="absolute top-3 right-3 z-20 p-1.5"
                  onClick={closeDialog}
               >
                  <TbX size={24} />
               </button>
               <div
                  className={twMerge(
                     'absolute inset-0 z-10 flex items-center justify-center font-bold bg-[rgba(255,255,255,0.9)] pointer-events-none transition',
                     isUpdating ? 'opacity-100' : 'opacity-0'
                  )}
               >
                  Egy pillanat...
               </div>
               {items.length ? (
                  <>
                     {items.map((item) => (
                        <div
                           className="flex items-center px-5 py-7 border-b border-b-soft"
                           key={item.key}
                        >
                           <div className="mr-6">
                              <button
                                 type="button"
                                 className="p-1 text-accent-primary"
                                 onClick={() => removeItem(item.key)}
                              >
                                 <TbX size={24} />
                              </button>
                           </div>
                           {item.image && (
                              <Image
                                 src={item.image}
                                 width={90}
                                 height={90}
                                 className="shrink-0 rounded-full mr-6"
                                 alt={item.name}
                              />
                           )}
                           <div className="flex-1 text-lg">{item.name}</div>
                           <div className="w-[7.25rem] ml-5 text-accent-primary font-bold text-right">
                              {formatPrice(item.price)}
                           </div>
                           <div className="w-[7.25rem] text-right">
                              <Input
                                 type="number"
                                 className="w-16"
                                 defaultValue={item.quantity}
                                 onChange={(e) => updateItem(item.key, Number(e.target.value))}
                              />
                           </div>
                           <div className="w-[7.25rem] text-accent-primary font-bold text-right">
                              {formatPrice(item.price * item.quantity)}
                           </div>
                        </div>
                     ))}
                     <div className="flex items-center justify-between mt-10">
                        <p className="text-lg font-bold text-accent-primary">
                           Összesen: {formatPrice(total)}
                        </p>
                        <Link
                           href="/checkout"
                           className={buttonVariants({ variant: 'primary', size: 'md' })}
                           onClick={closeDialog}
                        >
                           Tovább a rendeléshez
                        </Link>
                     </div>
                  </>
               ) : (
                  <p>A kosár üres.</p>
               )}
            </Dialog.Content>
         </Dialog.Portal>
      </Dialog.Root>
   );
}
