import React from "react";
import { useInView } from "react-intersection-observer";
import App from "./App";
import { render } from "./utils/test-utils";
import { useFetchBooks } from "./hooks/use-fetch-books";

jest.mock("./hooks/use-fetch-books");
jest.mock("react-intersection-observer");

test("renders learn react link", () => {
  const mockBook = { title: "test", isbn: "1234", coverSrc: "test" };
  (useFetchBooks as jest.Mock).mockReturnValue({
    isError: false,
    isLoading: false,
    data: { pages: [{ books: [mockBook], next: undefined }] },
  });
  (useInView as jest.Mock).mockReturnValue([null, false]);
  render(<App />);
});
