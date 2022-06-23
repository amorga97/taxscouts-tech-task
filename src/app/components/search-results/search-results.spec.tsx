import { useInView } from "react-intersection-observer";
import { SearchResults } from "./search-results";
import { render, screen } from "../../../utils/test-utils";
import { useFetchBooks } from "../../../hooks/use-fetch-books";

jest.mock("../../../hooks/use-fetch-books");
jest.mock("react-intersection-observer");

describe("Given the component SearchResults", () => {
  const mockBook = { title: "test", isbn: "1234", coverSrc: "test" };
  const mockFetchNextPage = jest.fn();
  describe("When rendering with a given input as props", () => {
    describe("And data is being fetched", () => {
      test("Renders text Loading...", () => {
        (useFetchBooks as jest.Mock).mockReturnValue({ isLoading: true });
        (useInView as jest.Mock).mockReturnValue([null, false]);
        render(<SearchResults searchInput="test" />);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
      });
    });

    describe("And an error occurs", () => {
      test("Renders an error message", () => {
        (useFetchBooks as jest.Mock).mockReturnValue({ isError: true });
        (useInView as jest.Mock).mockReturnValue([null, false]);
        render(<SearchResults searchInput="test" />);
        expect(screen.getByText(/error.../i)).toBeInTheDocument();
      });
    });

    describe("And the data fetching is sucessful", () => {
      test("Then it should display the results", async () => {
        (useFetchBooks as jest.Mock).mockReturnValue({
          isError: false,
          isLoading: false,
          data: { pages: [{ books: [mockBook], next: undefined }] },
        });
        (useInView as jest.Mock).mockReturnValue([null, false]);
        render(<SearchResults searchInput="test" />);

        expect(await screen.findByText(/test/i)).toBeInTheDocument();
      });
    });

    describe("And the data fetching is sucessful and user scrolls down", () => {
      test("Then it should display the results and fetch more data as the user scrolls", () => {
        (useFetchBooks as jest.Mock).mockReturnValue({
          isError: false,
          isLoading: false,
          fetchNextPage: mockFetchNextPage,
          data: { pages: [{ books: [mockBook], next: undefined }] },
          isFetchingNextPage: true,
        });
        (useInView as jest.Mock).mockReturnValueOnce([null, true]);
        (useInView as jest.Mock).mockReturnValue([null, false]);
        render(<SearchResults searchInput="test" />);

        expect(screen.getByText(/test/i)).toBeInTheDocument();
        expect(mockFetchNextPage).toHaveBeenCalled();
      });
    });
  });
});
