interface ApiResponse<T> {
   headers: Headers;
   data: T;
}

export async function apiRequest<T>(
   url: string,
   config: RequestInit = {}
): Promise<ApiResponse<T>> {
   // TODO: extend, dont overwrite
   config.headers = {
      Authorization: 'Basic ' + btoa(`${process.env.WP_API_KEY}:${process.env.WP_API_SECRET}`),
   };

   const response = await fetch(process.env.WP_API_URL + url, config);

   if (!response.ok) {
      throw new Error('Failed to fetch data.');
   }

   const data = await response.json();

   return new Promise<ApiResponse<T>>((resolve) =>
      resolve({
         headers: response.headers,
         data,
      })
   );
}
