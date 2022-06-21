import { Book } from "../../models/book";
import * as actions from "./action-creators";
import { bookSearchReducer } from "./reducer";

describe("Given bookSearchReducer", () => {
  const mockBook = new Book("test", "123", "test");
  const cases = [
    {
      action: actions.loadBooks([mockBook]),
      expectedState: { isLoading: false, results: [mockBook] },
    },
    {
      action: actions.setLoading(),
      expectedState: { isLoading: true, results: [] },
    },
    {
      action: { type: "@other/action-type" },
      expectedState: { isLoading: false, results: [] },
    },
  ];

  test.each(cases)(
    "When calling it with $action action, it should return $expectedState state",
    ({ action, expectedState }) => {
      expect(bookSearchReducer(undefined, action)).toEqual(expectedState);
    }
  );
});
