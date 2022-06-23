import { SearchResults } from "./search-results";
import { predictiveSearch } from "../../../services/prh-api";
import { act, render, screen } from "../../../utils/test-utils";
import { QueryClient, QueryClientProvider } from "react-query";
import userEvent from "@testing-library/user-event";
// jest.mock("../../../services/prh-api");

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

describe("Given the component SearchResults", () => {
  const mockBook = { title: "test", isbn: "1234", coverSrc: "test" };
  // const mockPredictiveSearch = predictiveSearch as jest.Mock;
  describe("When rendering with a given input as props", () => {
    describe("And data is being fetched", () => {
      test.todo("Renders text Loading...");
    });

    describe("And an error occurs", () => {
      it.todo("Renders an error message");
    });

    describe("And the data fetching is sucessful", () => {
      // mockPredictiveSearch.mockResolvedValueOnce({
      //   books: [mockBook],
      //   next: 5,
      // });
      // mockPredictiveSearch.mockResolvedValueOnce({
      //   books: [mockBook],
      //   next: undefined,
      // });
      test("Then it should display the results", async () => {
        renderWithClient(<SearchResults searchInput="test" />);

        // expect(mockPredictiveSearch).toHaveBeenCalled();

        await act(async () => {
          await new Promise((r) => setTimeout(r, 500));
        });
        // screen.debug();
        expect(await screen.findByText(/loading.../i)).toBeInTheDocument();
      });
    });
  });
});
