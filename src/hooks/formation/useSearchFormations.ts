import { AxiosInstance } from "axios";
import { useInfiniteQuery } from "react-query";

import { axiosPrivate } from "$utils/axiosPrivate";
import { axiosPublic } from "$utils/axiosPublic";

import { type Formations } from "../../../shared/formation/fomationv2.type";
import { getCurrentUserStorage } from "../../../src/components/utils/currentUserStorage";

const LIMIT = 10;

const getFormations = async (
  { pageParam, query }: { pageParam?: number; query: string },
  axiosInstance: AxiosInstance
): Promise<Formations> => {
  const response = await axiosInstance.post("/formations/search", {
    limit: LIMIT,
    query: query,
    offset: pageParam || 0,
  });
  return response.data;
};

export const useSearchFormations = (query: string) => {
  const FORMATIONS = async ({
    pageParam,
  }: {
    pageParam?: number;
  }): Promise<Formations> => {
    const currentUser = await getCurrentUserStorage();
    const isAuth = currentUser?.userId;

    return getFormations(
      { pageParam, query },
      isAuth ? axiosPrivate : axiosPublic
    );
  };

  const getNextPageParams = (lastPage: Formations) => {
    const total = lastPage.total;
    if (lastPage.formations.length < total) {
      return lastPage.formations.length;
    }
    return undefined;
  };

  const { data, fetchNextPage, hasNextPage, refetch, isLoading, isFetching } =
    useInfiniteQuery<Formations>("searchFormations", FORMATIONS, {
      retry: 2,
      getNextPageParam: getNextPageParams,
    });

  return { isLoading, isFetching, data, refetch, fetchNextPage, hasNextPage };
};
