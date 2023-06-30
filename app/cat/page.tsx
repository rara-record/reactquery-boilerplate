'use client';

import { FC } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

const CatInner: FC = () => <div>Boiler Plate</div>;

const Cat: FC = () => (
  <QueryClientProvider client={queryClient}>
    <CatInner />
  </QueryClientProvider>
);

export default Cat;
