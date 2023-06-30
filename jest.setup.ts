//See https://github.com/vercel/next.js/tree/canary/examples/with-jest

// Used for __tests__
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// Polyfill "window.fetch" used in the React component.
import "whatwg-fetch";

// Extend Jest "expect" functionality with Testing Library assertions.
import "@testing-library/jest-dom";
import { server } from "./tests/server";

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});
