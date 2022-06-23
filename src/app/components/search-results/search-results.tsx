import { Book } from "../../../models/book";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import * as action from "../../../redux/book-search/action-creators";
import { useFetchBooks } from "../../../hooks/use-fetch-books";
import { getAllLoadedResults } from "./helpers";

export function SearchResults({ searchInput }: { searchInput: string }) {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useFetchBooks(searchInput);

  let loadedResults: Book[] = [];

  if (!isLoading && !isError) {
    loadedResults = getAllLoadedResults(data!);
  }

  useEffect(() => {
    if (inView) {
      fetchNextPage();
      dispatch(action.loadResults(loadedResults));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error...</span>;
  }

  return (
    <>
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.books.map((book: Book) => (
            <li key={book.isbn}>
              <h2>{book.title}</h2>
              <img src={book.coverSrc} alt="" />
            </li>
          ))}
        </React.Fragment>
      ))}
      <p ref={ref}>
        {isFetchingNextPage ? "Loading more..." : "Nothing more to load"}
      </p>
    </>
  );
}
