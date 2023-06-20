interface Page {
   slug: string;
   title: {
      rendered: string;
   };
}

async function loadPages(): Promise<Page[]> {
   const response = await fetch('https://wp.laszlonorbert.hu/wp-json/wp/v2/pages', {
      next: {
         revalidate: 10,
      },
   });

   if (!response.ok) {
      throw new Error('Failed to fetch data');
   }

   return response.json();
}

export default async function HomePage() {
   const pages = await loadPages();

   return (
      <main className="">
         {pages.map((page) => (
            <div key={page.slug}>{page.title.rendered}</div>
         ))}
      </main>
   );
}
