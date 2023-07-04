interface PaginationProps {
   activePage: number;
   totalPages: number;
   onChange: (page: number) => void;
}

export default function Pagination({ activePage, totalPages, onChange }: PaginationProps) {
   if (totalPages === 1) {
      return;
   }

   return (
      <ul className="flex space-x-2">
         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li className="" key={page}>
               {page === activePage ? (
                  <button type="button" className="font-bold" disabled>
                     {page}
                  </button>
               ) : (
                  <button type="button" onClick={() => onChange(page)}>
                     {page}
                  </button>
               )}
            </li>
         ))}
      </ul>
   );
}
