import { useMutation, useQueryClient } from "react-query";

import { Result } from "../../../shared/formation/onisepFormation.type";
import { fetchWithToken } from "../../../utils/fetchWithToken";
import { BASE_URL } from "../../config";
import { useAuthenticatedQuery } from "../useAuthenticatedQuery";
import { useCurrentUser } from "../user/useCurrentUser";

const API_URL = BASE_URL;

const useFavoris = () => {
  const { accessToken } = useCurrentUser();
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
  } = useAuthenticatedQuery("favoris", fetchFavoris, { retry: 2 });

  const deleteFormation = useMutation(
    async (id: number) => {
      const response = await fetch(`${API_URL}/favoris/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("favoris");
      },
    }
  );

  const addFormation = useMutation(
    async (formation: Result) => {
      const response = await fetch(`${API_URL}/favoris`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
