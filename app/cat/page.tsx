'use client';

import Image from 'next/image';
import { FC, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useCatQuery } from '@/app/cat/useCatQuery';

const queryClient = new QueryClient();

type TCats = {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: any[]
}

// eslint-disable-next-line no-shadow
enum CatBreed {
  scottishFold = 'sfol',
  abyssinian = 'abys',
  bengal = 'beng',
}

const CatInner: FC = () => {
  const [currentBreed, setCurrentBreed] = useState<string>(CatBreed.abyssinian);
  const { isLoading, data } = useCatQuery(currentBreed);

  if (isLoading) {
    return <div className="mt-10 m-auto text-center">Cats are coming!</div>;
  }

  if (data.error) {
    return (
      <div className="mt-10 m-auto text-center">Cats could not come!</div>
    );
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <button type="button" onClick={() => setCurrentBreed(CatBreed.scottishFold)}>Scottish Fold</button>
          </li>
          <li>
            <button type="button" onClick={() => setCurrentBreed(CatBreed.bengal)}>Bengal</button>
          </li>
          <li>
            <button type="button" onClick={() => setCurrentBreed(CatBreed.abyssinian)}>Abyssinian</button>
          </li>
        </ul>
      </nav>
      <div>
        {data?.map((cat: TCats) => (
          <Image key={cat.id} src={cat.url} alt={cat.breeds[0]?.name || 'unknown'} width={300} height={300} />
        ))}
      </div>
    </>
  );
};

const Cat: FC = () => (
  <QueryClientProvider client={queryClient}>
    <CatInner />
  </QueryClientProvider>
);

export default Cat;
