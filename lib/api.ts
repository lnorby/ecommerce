import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class Api {
   axiosInstance: AxiosInstance;

   constructor(axiosInstance: AxiosInstance) {
      this.axiosInstance = axiosInstance;
   }

   get<T>(url: string, options: Omit<AxiosRequestConfig, 'url' | 'method'> = {}) {
      return this.makeRequest<T>({ ...options, url, method: 'GET' });
   }

   post<T>(
      url: string,
      data: any,
      options: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> = {}
   ) {
      return this.makeRequest<T>({ ...options, url, method: 'POST', data });
   }

   patch<T>(
      url: string,
      data: any,
      options: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> = {}
   ) {
      return this.makeRequest<T>({ ...options, url, method: 'PATCH', data });
   }

   put<T>(
      url: string,
      data: any,
      options: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> = {}
   ) {
      return this.makeRequest<T>({ ...options, url, method: 'PUT', data });
   }

   delete<T>(url: string, options: Omit<AxiosRequestConfig, 'url' | 'method'> = {}) {
      return this.makeRequest<T>({ ...options, url, method: 'DELETE' });
   }

   private async makeRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      return await this.axiosInstance.request(config);
   }
}

const axiosInstance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_WP_API_URL,
   headers: {
      Authorization:
         'Basic ' +
         btoa(`${process.env.NEXT_PUBLIC_WP_API_KEY}:${process.env.NEXT_PUBLIC_WP_API_SECRET}`),
   },
});

export const api = new Api(axiosInstance);
