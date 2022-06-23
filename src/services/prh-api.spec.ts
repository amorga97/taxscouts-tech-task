import { predictiveSearch } from "./prh-api";
import axios from "axios";
import { Book } from "../models/book";

jest.mock("axios");

describe("Given the service function predictiveSearch", () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        recordCount: 10,
        data: { results: [{ key: 1234 }] },
      },
    });
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        data: {
          titles: [
            { title: "testBook", isbn: "1234", _links: [{}, { href: "href" }] },
          ],
        },
      },
    });
  });
  describe("When calling it with a string input", () => {
    test("Then it should fetch data from the api", async () => {
      const { books, next } = await predictiveSearch("test");
      expect(books).toEqual([{ ...new Book("testBook", "1234", "href") }]);
      expect(next).toBe(5);
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });

  describe("When calling it with a string input and a start of 5", () => {
    test("Then it should fetch data from the api and return next as undefined", async () => {
      const { books, next } = await predictiveSearch("test", 5);
      expect(books).toEqual([{ ...new Book("testBook", "1234", "href") }]);
      expect(next).toBeUndefined();
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });

  describe("When calling it with an empty string as input", () => {
    test("Then it should not fetch data from the api", async () => {
      const { books, next } = await predictiveSearch("");
      expect(books).toEqual([]);
      expect(next).toBeUndefined();
      expect(axios.get).not.toHaveBeenCalled();
    });
  });
});
