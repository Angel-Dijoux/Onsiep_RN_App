import { useQueryClient } from "react-query";

import { axiosPrivate } from "$utils/axiosPrivate";

import { fetchWithToken } from "../../../utils/fetchWithToken";
import { UserFavoris } from "../../../utils/onisep.type";
import { useAuthenticatedMutation } from "../useAuthenticatedMutation";
import { useAuthenticatedQuery } from "../useAuthenticatedQuery";

const useFavoris = () => {
  const queryClient = useQueryClient();

  const fetchFavoris = async () => {
    const response = await axiosPrivate.get("/favoris");
    return response.data;
  };

  const {
    isLoading,
    error,
    data: favoris,
  } = useAuthenticatedQuery<UserFavoris>("favoris", fetchFavoris, { retry: 2 });

  const deleteFormation = useAuthenticatedMutation(
    async (id: number) => {
      const response = await fetchWithToken(`/favoris/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("favoris");
        queryClient.invalidateQueries("get_formation_is_fav");
      },
    }
  );

  const handleDeleteFavoris = async (id: number) => {
    await deleteFormation.mutateAsync(id);
  };

  return { isLoading, error, favoris, handleDeleteFavoris };
};

export { useFavoris };
