import { useInfiniteQuery } from "react-query";
import { Book } from "../../models/book";
import { predictiveSearch } from "../../services/prh-api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function SearchResults({ searchInput }: { searchInput: string }) {
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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
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
