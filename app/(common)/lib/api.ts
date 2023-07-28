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
      return Api.makeRequest<T>(url, {
         ...config,
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json',
         },
      });
   }

   put<T>(url: string, data: any, config: RequestInit = {}) {
      return Api.makeRequest<T>(url, {
         ...config,
         method: 'PUT',
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json',
         },
      });
   }

   patch<T>(url: string, data: any, config: RequestInit = {}) {
      return Api.makeRequest<T>(url, {
         ...config,
         method: 'PATCH',
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json',
         },
      });
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
               'Basic ' +
               btoa(`${process.env.NEXT_PUBLIC_API_KEY}:${process.env.NEXT_PUBLIC_API_SECRET}`),
         },
      };

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, config);

      if (!response.ok) {
         throw new Error('API request failed.');
      }

      return {
         headers: response.headers,
         data: await response.json(),
      };
   }
}

export const api = new Api();
