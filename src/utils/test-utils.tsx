import { render as rtlRender } from "@testing-library/react";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { bookSearchReducer } from "../redux/book-search/reducer";

import { ifBookSearchStore } from "../interfaces/store-interface";
import { QueryClient, QueryClientProvider } from "react-query";

function render(
  ui: JSX.Element,
  {
    preloadedState,
    store = configureStore({
      reducer: { bookSearch: bookSearchReducer },
      preloadedState,
    }),
    ...renderOptions
  }: {
    preloadedState?: {
      bookSearch: {
        isLoading: boolean;
        results: { title: string; isbn: string; coverSrc: string }[];
      };
    };
    store?: EnhancedStore<{ bookSearch: ifBookSearchStore }>;
  } = {}
) {
  function Wrapper({ children }: { children: JSX.Element }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}
