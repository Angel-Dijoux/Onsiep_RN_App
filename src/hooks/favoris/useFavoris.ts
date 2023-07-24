import { useQueryClient } from "react-query";

import { Result } from "../../../shared/formation/onisepFormation.type";
import { fetchWithToken } from "../../../utils/fetchWithToken";
import { UserFavoris } from "../../../utils/onisep.type";
import { useAuthenticatedMutation } from "../useAuthenticatedMutation";
import { useAuthenticatedQuery } from "../useAuthenticatedQuery";

const useFavoris = () => {
  const queryClient = useQueryClient();

  const fetchFavoris = async () => {
    const response = await fetchWithToken("/favoris", { method: "GET" });
    if (!response.ok) {
      throw new Error("Error in fetchFavoris");
    }
    return response.json();
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

  const addFormation = useAuthenticatedMutation(
    async (formation: Result) => {
      const response = await fetchWithToken("/favoris", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formation),
      });
      if (!response.ok) {
        throw new Error("Error on add in favorite");
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

  const handleAddFavoris = async (formation: Result) => {
    await addFormation.mutateAsync(formation);
  };

  return { isLoading, error, favoris, handleDeleteFavoris, handleAddFavoris };
};

export { useFavoris };
