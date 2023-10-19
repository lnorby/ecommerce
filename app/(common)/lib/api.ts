export async function apiRequest(
   query: string,
   variables: any = {},
   revalidate?: number
): Promise<any> {
   let headers: any = { 'Content-Type': 'application/json' };

   if (revalidate) {
      headers = { ...headers, next: { revalidate } };
   }

   const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
         query,
         variables,
      }),
   });

   if (!response.ok) {
      throw new Error('API request failed.');
   }

   return response.json();
}
