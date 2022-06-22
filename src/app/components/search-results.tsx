import { useInfiniteQuery } from "react-query";
import { Book } from "../../models/book";
import { predictiveSearch } from "../../services/prh-api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import * as action from "../../redux/book-search/action-creators";

export function SearchResults({ searchInput }: { searchInput: string }) {
  const dispatch = useDispatch();
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["predictive", searchInput],
    ({ pageParam = 0 }) => {
      return predictiveSearch(searchInput, pageParam);
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.next;
      },
    }
  );

  let loadedResults: Book[] = [];

  if (!isLoading && !isError) {
    const pagesData = [
      ...(data?.pages as {
        books: { title: any; isbn: any; coverSrc: any }[];
        next: number | undefined;
      }[]),
    ].reduce((prev, curr) => ({
      ...prev,
      books: [...prev.books, ...curr.books],
    }));

    loadedResults = pagesData.books;
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
      {data?.pages.map((page) => (
        <>
          {page.books.map((book: Book) => (
            <li key={book.isbn}>
              <h2>{book.title}</h2>
              <img src={book.coverSrc} alt="" />
            </li>
          ))}
        </>
      ))}
      <p ref={ref}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load Newer"
          : "Nothing more to load"}
      </p>
    </>
  );
}
