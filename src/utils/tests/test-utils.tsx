import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";

export const queryCache = new QueryCache();
export const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function customRender(ui: ReactNode, options?: RenderOptions) {
  const user = userEvent.setup();

  return {
    user,
    ...render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>, { ...options }),
  };
}

export * from "@testing-library/react";
export { customRender as render };
