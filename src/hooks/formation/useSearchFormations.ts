import { useInfiniteQuery } from "react-query";

import { type Formations } from "../../../shared/formation/fomationv2.type";
import { fetchWithoutToken } from "../../../utils/fetchWithToken";

const LIMIT = 10;
export const useSearchFormations = (query: string) => {
  const fetchSearchResult = async ({ pageParam }: { pageParam?: number }) => {
    const response = await fetchWithoutToken("/formations/search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: LIMIT,
        query: query,
        offset: pageParam ?? 0,
      }),
    });
    if (!response.ok) {
      throw new Error("Error on search formations");
    }
    return response.json();
  };

  const getNextPageParams = (lastPage: Formations) => {
    const total = lastPage.total;
    if (lastPage.formations.length < total) {
      return lastPage.formations.length;
    }
    return undefined;
  };

  const { data, fetchNextPage, hasNextPage, refetch, isLoading } =
    useInfiniteQuery<Formations>("searchFormations", fetchSearchResult, {
      retry: 2,
      getNextPageParam: getNextPageParams,
    });

  return { isLoading, data, refetch, fetchNextPage, hasNextPage };
};
