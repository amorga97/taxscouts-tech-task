import { InfiniteData } from "react-query";
import { Book } from "../../../models/book";
import { getAllLoadedResults } from "./helpers";

describe("Given the helper function getAllLoadedResults", () => {
  const mockInfiniteData = {
    pages: [
      { books: [{ ...new Book("test", "12345", "test") }] },
      { books: [{ ...new Book("test", "12345", "test") }] },
    ],
  };
  describe("When calling it with some pages of books", () => {
    test("Then it should return all the books", () => {
      expect(
        getAllLoadedResults(
          mockInfiniteData as InfiniteData<{
            books: { title: string; isbn: string; coverSrc: string }[];
            next: number | undefined;
          }>
        )
      ).toHaveLength(2);
    });
  });
});
