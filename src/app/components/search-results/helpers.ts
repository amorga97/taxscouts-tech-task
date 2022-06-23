import { InfiniteData } from "react-query";

export const getAllLoadedResults = (
  data: InfiniteData<{
    books: { title: string; isbn: string; coverSrc: string }[];
    next: number | undefined;
  }>
) => {
  const pagesData = [...data?.pages].reduce((prev, curr) => ({
    ...prev,
    books: [...prev.books, ...curr.books],
  }));

  return pagesData.books;
};
