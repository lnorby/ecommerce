interface ApiResponse<T> {
   headers: Headers;
   data: T;
}

class Api {
   get<T>(url: string, revalidate?: number, config: RequestInit = {}) {
      config = { ...config, method: 'GET' };

      if (revalidate) {
         config = { ...config, next: { revalidate } };
      }

      return Api.makeRequest<T>(url, config);
   }

   post<T>(url: string, data: any, config: RequestInit = {}) {
      return Api.makeRequest<T>(url, { ...config, method: 'POST', body: JSON.stringify(data) });
   }

   put<T>(url: string, data: any, config: RequestInit = {}) {
      return Api.makeRequest<T>(url, { ...config, method: 'PUT', body: JSON.stringify(data) });
   }

   patch<T>(url: string, data: any, config: RequestInit = {}) {
      return Api.makeRequest<T>(url, { ...config, method: 'PATCH', body: JSON.stringify(data) });
   }

   delete<T>(url: string, config: RequestInit = {}) {
      return Api.makeRequest<T>(url, { ...config, method: 'DELETE' });
   }

   static async makeRequest<T>(url: string, config: RequestInit = {}): Promise<ApiResponse<T>> {
      // @ts-ignore
      config = {
         ...config,
         headers: {
            ...config.headers,
            Authorization:
               'Basic ' + btoa(`${process.env.WP_API_KEY}:${process.env.WP_API_SECRET}`),
         },
      };

      const response = await fetch(process.env.WP_API_URL + url, config);

      if (!response.ok) {
         throw new Error('API request failed.');
      }

      const data = await response.json();

      return {
         headers: response.headers,
         data,
      };
   }
}

export const api = new Api();
