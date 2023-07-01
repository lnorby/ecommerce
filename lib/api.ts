async function makeRequest<T>(url: string, options: RequestInit): Promise<T> {
   // TODO: extend headers
   options.headers = {
      Authorization:
         'Basic ' +
         btoa(`${process.env.NEXT_PUBLIC_WP_API_KEY}:${process.env.NEXT_PUBLIC_WP_API_SECRET}`),
   };

   const response = await fetch(process.env.NEXT_PUBLIC_WP_API_URL + url, options);

   if (!response.ok) {
      throw new Error('Failed to fetch data.');
   }

   return response.json();
}

export const api = {
   get<T>(url: string, options: Omit<RequestInit, 'method'> = {}): Promise<T> {
      return makeRequest<T>(url, { ...options, method: 'GET' });
   },
   post<T>(url: string, data: any, options: Omit<RequestInit, 'method' | 'body'> = {}): Promise<T> {
      return makeRequest<T>(url, { ...options, method: 'POST', body: data });
   },
   patch<T>(
      url: string,
      data: any,
      options: Omit<RequestInit, 'method' | 'body'> = {}
   ): Promise<T> {
      return makeRequest<T>(url, { ...options, method: 'PATCH', body: data });
   },
   put<T>(url: string, data: any, options: Omit<RequestInit, 'method' | 'body'> = {}): Promise<T> {
      return makeRequest<T>(url, { ...options, method: 'PUT', body: data });
   },
   delete<T>(url: string, options: Omit<RequestInit, 'method'> = {}): Promise<T> {
      return makeRequest<T>(url, { ...options, method: 'DELETE' });
   },
};
