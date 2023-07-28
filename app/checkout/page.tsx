'use client';

import { useQuery } from 'react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Header } from '@/app/(common)/components/layout/header';
import { Heading } from '@/app/(common)/components/ui/heading';
import { Breadcrumbs } from '@/app/(common)/components/ui/breadcrumbs';
import { FormField } from '@/app/(common)/components/form/form-field';
import { Input } from '@/app/(common)/components/form/input';
import { Button } from '@/app/(common)/components/ui/button';
import { useCartStore } from '@/app/cart/store';
import { formatPrice } from '@/app/(common)/utils/format-price';
import { fetchPaymentMethods } from '@/app/(common)/api/payment-methods';
import { Choice } from '@/app/(common)/components/form/choice';

const validationSchema = z.object({
   firstName: z.string().min(1),
   lastName: z.string().min(1),
   companyName: z.string().optional(),
   postalCode: z.string().min(1),
   city: z.string().min(1),
   address: z.string().min(1),
   phone: z.string().min(1),
   email: z.string().email(),
   paymentMethod: z.string().min(1),
});

export interface CheckoutPageProps {}

export default function CheckoutPage({}: CheckoutPageProps) {
   const {
      handleSubmit,
      register,
      formState: { errors },
   } = useForm<z.infer<typeof validationSchema>>({
      resolver: zodResolver(validationSchema),
   });

   const { items, total } = useCartStore((state) => ({ items: state.items, total: state.total }));
   const { data: paymentMethods } = useQuery('paymentMethods', fetchPaymentMethods);

   function sendData(formData: z.infer<typeof validationSchema>) {
      console.log(formData);
   }

   return (
      <>
         <Header centered>
            <Heading as="h1" style="h3">
               Megrendelés
            </Heading>
            <Breadcrumbs
               items={[{ label: 'Nyitóoldal', url: '/' }, { label: 'Megrendelés' }]}
               className="mt-8"
            />
         </Header>
         <div className="container-xs pt-12 pb-20">
            <form className="p-12 bg-soft" onSubmit={handleSubmit(sendData)}>
               <Heading as="h2" style="h5" className="mb-9">
                  Számlázási adatok
               </Heading>
               <div className="mb-20 space-y-6">
                  <div className="grid grid-cols-2 gap-x-11 gap-y-6">
                     <FormField label="Vezetéknév" required error={errors.firstName?.message}>
                        <Input {...register('firstName')} />
                     </FormField>
                     <FormField label="Keresztnév" required error={errors.lastName?.message}>
                        <Input {...register('lastName')} />
                     </FormField>
                  </div>
                  <FormField label="Cégnév" error={errors.companyName?.message}>
                     <Input {...register('companyName')} />
                  </FormField>
                  <div className="grid grid-cols-2 gap-x-11 gap-y-6">
                     <FormField label="Irányítószám" required error={errors.postalCode?.message}>
                        <Input {...register('postalCode')} />
                     </FormField>
                     <FormField label="Település" required error={errors.city?.message}>
                        <Input {...register('city')} />
                     </FormField>
                  </div>
                  <FormField label="Cím" required error={errors.address?.message}>
                     <Input {...register('address')} />
                  </FormField>
                  <FormField label="Telefonszám" required error={errors.phone?.message}>
                     <Input {...register('phone')} />
                  </FormField>
                  <FormField label="E-mail cím" required error={errors.email?.message}>
                     <Input {...register('email')} />
                  </FormField>
               </div>
               <div className="mb-14 p-6 border border-soft bg-white">
                  <table className="w-full">
                     <thead>
                        <tr>
                           <th className="pb-6 pr-5 text-xl font-bold text-left">Termék</th>
                           <th className="pb-6 pr-5 text-xl font-bold text-left">Összeg</th>
                        </tr>
                     </thead>
                     <tbody>
                        {items.map((item) => (
                           <tr key={item.key}>
                              <td className="pb-6">
                                 {item.name} <strong>× {item.quantity}</strong>
                              </td>
                              <td className="pb-6 pr-5">
                                 {formatPrice(item.price * item.quantity)}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                     <tfoot>
                        <tr>
                           <th className="pt-6 border-t border-t-soft text-3xl font-bold text-left">
                              Végösszeg
                           </th>
                           <td className="pt-6 border-t border-t-soft text-3xl font-bold text-accent-primary">
                              {formatPrice(total)}
                           </td>
                        </tr>
                     </tfoot>
                  </table>
               </div>
               <div className="mb-10 space-y-3.5 text-lg">
                  {paymentMethods?.map((paymentMethod) => (
                     <Choice
                        {...register('paymentMethod')}
                        type="radio"
                        label={paymentMethod.name}
                        value={paymentMethod.id}
                        key={paymentMethod.id}
                     />
                  ))}
                  {errors.paymentMethod && (
                     <p className="mt-2 text-sm text-error">{errors.paymentMethod.message}</p>
                  )}
               </div>
               <p className="mb-8 pt-5 border-t border-soft text-sm leading-snug">
                  Your personal data will be used to process your order, support your experience
                  throughout this website, and for other purposes described in our privacy policy.
               </p>
               <div className="flex justify-end">
                  <Button type="submit" variant="primary" size="lg">
                     Megrendelés elküldése
                  </Button>
               </div>
            </form>
         </div>
      </>
   );
}
