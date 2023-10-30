import {
  useQuery,
  QueryFunction,
  UseQueryResult,
  QueryOptions,
} from "react-query";

import {
  getCurrentUserStorage,
  setCurrentUserStorage,
} from "../components/utils/currentUserStorage";
import { Config } from "../config";

type QueryFn<TData> = QueryFunction<TData, any>;

export type AuthenticatedQueryResult<TData> = UseQueryResult<TData> & {
  refresh: () => void;
};

export const fetchRefreshToken = async () => {
  const currentUserInfo = await getCurrentUserStorage();
  if (!currentUserInfo) return;

  const refreshToken = currentUserInfo?.refreshToken;
  const API_LINK = `${Config.baseUrl}/auth/token/refresh`;

  const response = await fetch(API_LINK, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    setCurrentUserStorage({
      id: Number(currentUserInfo?.userId),
      username: String(currentUserInfo?.username),
      accessToken: data.access,
      refreshToken: String(refreshToken),
    });
  }
  throw new Error("Error in fetchRefreshToken");
};

export const useAuthenticatedQuery = <TData>(
  queryKey: string,
  queryFn: QueryFn<TData>,
  queryOptions?: QueryOptions<TData>
): AuthenticatedQueryResult<TData> => {
  const queryResult = useQuery<TData>(queryKey, queryFn, queryOptions);

  const refresh = () => {
    queryResult.refetch();
  };

  const { isError, error } = queryResult;

  if (isError && error) {
    fetchRefreshToken()
      .then(() => {
        refresh();
      })
      .catch((error) => {
        console.error("Erreur lors du rafraîchissement du token :", error);
      });
  }

  return { ...queryResult, refresh };
};
