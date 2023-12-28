import { AxiosInstance } from "axios";
import { useInfiniteQuery } from "react-query";

import { axiosPrivate } from "$utils/axiosPrivate";
import { axiosPublic } from "$utils/axiosPublic";

import { Formations } from "../../../shared/formation/fomationv2.type";
import { getCurrentUserStorage } from "../../../src/components/utils/currentUserStorage";

const LIMIT = 10;

const getFormations = async (
  { pageParam }: { pageParam?: number },
  axiosInstance: AxiosInstance
): Promise<Formations> => {
  const response = await axiosInstance.post("/formations/", {
    limit: LIMIT,
    offset: pageParam || 0,
  });
  return response.data;
};

const FORMATIONS = async ({
  pageParam,
}: {
  pageParam?: number;
}): Promise<Formations> => {
  const currentUser = await getCurrentUserStorage();
  const isAuth = currentUser?.userId;

  return getFormations({ pageParam }, isAuth ? axiosPrivate : axiosPublic);
};

const useGetOnisepFormations = () => {
  const getNextPageParams = (lastPage: Formations) => {
    const total = lastPage.total;
    if (lastPage.formations.length < total) {
      return lastPage.formations.length;
    }
    return undefined;
  };

  const { data, fetchNextPage, hasNextPage, refetch, isLoading } =
    useInfiniteQuery<Formations>("mainFormations", FORMATIONS, {
      retry: 2,
      getNextPageParam: getNextPageParams,
    });

  console.log(data?.pages[0].formations[0]);

  return { isLoading, data, refetch, fetchNextPage, hasNextPage };
};

export { useGetOnisepFormations };
