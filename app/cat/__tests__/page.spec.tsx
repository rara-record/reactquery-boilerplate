import { createWrapper, renderWithClient } from '@/tests/utils';
import { renderHook, waitFor } from '@testing-library/react';
import Cat from '@/app/cat/page';
import { server } from '@/tests/server';
import { rest } from 'msw';
import { useCatQuery } from '@/app/cat/useCatQuery';

// For warning with act see this post below and try to fix it! :)
// https://github.com/TanStack/query/issues/432

//  waitFor 함수를 사용하여 비동기 처리를 수행합니다. 이 함수는 전달된 콜백 사용이 완료될 때까지 기다립니다.
//  renderWithClient() 함수를 사용하여 Cat 컴포넌트를 렌더링하고, 렌더링에 대한 정보를 반환합니다
//  findAllByAltText 함수를 사용하여 모든 alt 텍스트에 'fold'가 포함된 이미지 요소를 찾습니다.
//  images.length가 0인 경우, 즉 전혀 이미지가 없는 경우에는 에러를 발생시키며, 테스트를 실패하게 됩니다.
//  findAllByAltText: 반환된 렌더링 정보를 사용하여 DOM 요소를 검색합니다. alt 속성 텍스트를 기반으로 이미지 요소를 찾습니다.

/** *
 * getBy*: 첫 번째 일치하는 요소를 반환합니다. 일치하는 요소가 없거나 여러 개가 있는 경우 에러를 발생시킵니다.
 * queryBy*: 첫 번째 일치하는 요소를 반환하거나 null을 반환합니다. 일치하는 요소가 두 개 이상 있는 경우 에러를 발생시킵니다.
 * findBy*: 첫 번째 일치하는 요소를 반환하는 프로미스를 반환합니다. 일치하는 요소가 없거나 여러 개가 있는 경우 에러를 발생시킵니다.
 * getAllBy*: 일치하는 모든 요소를 배열로 반환합니다. 일치하는 요소가 없는 경우 에러를 발생시킵니다.
 * queryAllBy*: 일치하는 모든 요소를 배열로 반환합니다. 일치하는 요소가 없는 경우 빈 배열을 반환합니다.
 * findAllBy*: 일치하는 모든 요소를 배열로 반환하는 프로미스를 반환합니다. 일치하는 요소가 없는 경우 에러를 발생시킵니다.
 * */

// toBeTruthy : true로 취급되는 구문을 확인한다.

describe('Cat Page', () => {
  it('renders as expected on success', async () => { // 성공적으로 렌더링 된 경우 페이지가 예상대로 표시되는지 확인
    await waitFor(async () => {
      const { findAllByAltText } = await renderWithClient(<Cat />);
      const images = await findAllByAltText(/fold/i);
      expect(images).toBeTruthy();
    });
  });

  it('renders as expected on loading', () => {
    const { findByText } = renderWithClient(<Cat />);
    const elements = findByText(/Cats could not come/i);
    expect(elements).toBeTruthy();
  });

  it('renders as expected on error', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => res(ctx.status(403))),
    );

    await waitFor(async () => {
      const { findByText } = await renderWithClient(<Cat />);
      const elements = await findByText(/Cats could not come/i);
      expect(elements).toBeTruthy();
    });
  });
});

// renderHook() 함수를 사용하여 useCatQuery 훅을 실행합니다.
// abys에 대한 데이터를 로드하는데 필요한 wrapper 옵션을 전달합니다.

/**
 * renderHook() : 콜백 함수를 파라미터로 받으며, 콜백 함수가 리턴하는 값은, renderHook 리턴값의 result 속성을 통해 참조가 가능합니다.
 * result.current 필드를 통해, 콜백 함수가 마지막으로 리턴한 값을 참조할 수 있습니다.
 * */

describe('useCatQuery', () => { //  API 요청이 성공적으로 처리될 때 훅이 데이터를 반환하는지 확인
  it('returns data on success', async () => {
    const { result } = renderHook(() => useCatQuery('abys'), {
      wrapper: createWrapper(),
    });

    await waitFor(async () => {
      expect(result.current.isSuccess).toBeTruthy();
    });
  });

  it('returns data on failure', async () => {
    server.use(rest.get('https://api.thecatapi.com/*', (req, res, ctx) => res(ctx.status(500))));

    const { result } = renderHook(() => useCatQuery('abys'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data.error).toBe('Something went wrong');
    });
  });
});
