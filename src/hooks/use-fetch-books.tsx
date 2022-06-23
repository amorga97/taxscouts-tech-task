import { useInfiniteQuery } from "react-query";
import { predictiveSearch } from "../services/prh-api";

export function useFetchBooks(searchInput: string) {
  return useInfiniteQuery(
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
}
