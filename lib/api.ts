type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function makeRequest<T>(url: string, method: HttpMethod, options: object): Promise<T> {
   const isDefaultUrl = !url.match(/^https?:\/\//);

   if (isDefaultUrl) {
      options.headers = {
         Authorization: 'Basic ' + btoa(`${process.env.WP_API_KEY}:${process.env.WP_API_SECRET}`),
         ...(options.headers ?? {}),
      };
   }

   const response = await fetch((isDefaultUrl ? process.env.WP_API_URL : '') + url, {
      method,
      ...options,
   });

   if (!response.ok) {
      throw new Error('Failed to fetch data.');
   }

   return response.json();
}

export const api = {
   get<T>(url: string, options: object = {}): Promise<T> {
      return makeRequest<T>(url, 'GET', options);
   },
   post<T>(url: string, data: any, options: object = {}): Promise<T> {
      return makeRequest<T>(url, 'POST', { ...options, data });
   },
   patch<T>(url: string, data: any, options: object = {}): Promise<T> {
      return makeRequest<T>(url, 'PATCH', { ...options, data });
   },
   put<T>(url: string, data: any, options: object = {}): Promise<T> {
      return makeRequest<T>(url, 'PUT', { ...options, data });
   },
   delete<T>(url: string, options: object = {}): Promise<T> {
      return makeRequest<T>(url, 'DELETE', options);
   },
};
