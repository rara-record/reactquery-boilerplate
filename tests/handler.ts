import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.thecatapi.com/*', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      {
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        url: 'https://abcd.test',
        breeds: [{ name: 'Scottish Fold' }],
      },
    ]),
  )),
];
