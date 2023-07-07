'use client';

interface ErrorProps {
   error: Error;
   reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
   return (
      <div className="container">
         <p>Hiba történt.</p>
         <button onClick={() => reset()}>Próbálja újra!</button>
      </div>
   );
}
