import "@testing-library/jest-dom";

import { server } from "@/utils/tests/mocks/node";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
