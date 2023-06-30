import { useQuery } from 'react-query';

const getCat = (breedId: string) => (
  fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}`,
    {
      headers: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY!,
      },
    },
  ).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return { error: 'Something went wrong' };
  })
);

export const useCatQuery = (currentBreed: string) => useQuery({
  queryKey: ['cats', currentBreed],
  queryFn: () => getCat(currentBreed),
});
