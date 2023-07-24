import {
  useMutation,
  MutationOptions,
  MutationFunction,
  UseMutationResult,
} from "react-query";

import { fetchRefreshToken } from "./useAuthenticatedQuery";

type MutationFn<TData, TVariables> = MutationFunction<TData, TVariables>;

export type AuthenticatedMutationResult<TData, TVariables> = UseMutationResult<
  TData,
  unknown,
  TVariables,
  unknown
> & {
  refresh: () => void;
};

export const useAuthenticatedMutation = <TData, TVariables>(
  mutationFn: MutationFn<TData, TVariables>,
  mutationOptions?: MutationOptions<TData, unknown, TVariables, unknown>
): AuthenticatedMutationResult<TData, TVariables> => {
  const mutationResult = useMutation<TData, unknown, TVariables, unknown>(
    mutationFn,
    mutationOptions
  );

  const refresh = () => {
    mutationResult.reset();
  };

  const { isError, error } = mutationResult;

  if (isError && error) {
    fetchRefreshToken()
      .then(() => {
        refresh();
      })
      .catch((error) => {
        console.error("Error while refreshing the token:", error);
      });
  }

  return { ...mutationResult, refresh };
};
