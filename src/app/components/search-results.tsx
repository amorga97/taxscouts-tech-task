import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import { Book } from "../../models/book";

import { getFurtherInfo, predictiveSearch } from "../../services/prh-api";
import * as action from "../../redux/book-search/action-creators";

export function SearchResults({ searchInput }: { searchInput: string }) {
  const dispatch = useDispatch();
  console.log("render");

  const { data: worklist } = useQuery(["predictive", searchInput], () => {
    return predictiveSearch(searchInput);
  });

  const {
    isIdle,
    data: books,
    isLoading,
    isError,
  } = useQuery(
    ["books", worklist],
    () => {
      return getFurtherInfo(worklist);
    },
    {
      enabled: !!worklist,
    }
  );

  if (isLoading || isIdle) {
    return <span>Loading...</span>;
  }
  dispatch(action.toggleLoading());

  if (isError) {
    return <span>Error...</span>;
  }
  dispatch(action.loadBooks(books));

  return (
    <>
      {books.map((book: Book) => (
        <li key={book.isbn}>
          <h2>{book.title}</h2>
          <img src={book.coverSrc} alt="" />
        </li>
      ))}
    </>
  );
}
