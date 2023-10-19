'use client';

import {ReactNode, useState} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

// import { SessionProvider } from 'next-auth/react';

export interface ProvidersProps {
   children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
   const [queryClient] = useState(() => new QueryClient());

   return (
      <QueryClientProvider client={queryClient}>
         {/*<SessionProvider>*/}
         {children}
         {/*</SessionProvider>*/}
      </QueryClientProvider>
   );
}
