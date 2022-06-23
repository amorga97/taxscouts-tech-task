import { useInView } from "react-intersection-observer";
import { act } from "react-dom/test-utils";
import { renderWithClient, screen } from "../../utils/test-utils";
import { QuickSearch } from "./quick-search";
import { useFetchBooks } from "../../hooks/use-fetch-books";
import userEvent from "@testing-library/user-event";

jest.mock("../../hooks/use-fetch-books");
jest.mock("react-intersection-observer");

describe("Given the component QuickSearch", () => {
  const mockBook = { title: "test", isbn: "1234", coverSrc: "test" };
  describe("When rendering it and inputing a book to search", () => {
    test("Then it should update the inputValue", async () => {
      (useFetchBooks as jest.Mock).mockReturnValue({
        isError: false,
        isLoading: false,
        data: { pages: [{ books: [mockBook], next: undefined }] },
      });
      (useInView as jest.Mock).mockReturnValue([null, false]);
      renderWithClient(<QuickSearch />);
      const input = screen.getByPlaceholderText("search book");

      userEvent.type(input, "test");

      await act(async () => {
        await new Promise((r) => setTimeout(r, 350));
      });

      expect(screen.getByDisplayValue("test")).toBeInTheDocument();
    });
  });
});
