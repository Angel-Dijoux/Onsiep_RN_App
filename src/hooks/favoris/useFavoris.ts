import { useQuery, useMutation, useQueryClient } from "react-query";

import { Result } from "../../../shared/formation/onisepFormation.type";
import { BASE_URL } from "../../config";
import { useRefreshToken } from "../../hooks/useRefreshToken";
import { useCurrentUser } from "../user/useCurrentUser";

const API_URL = BASE_URL;

const useFavoris = () => {
  const { refreshToken } = useCurrentUser();
  const queryClient = useQueryClient();
  const { accessToken: token, isLoading: isRefreshing } =
    useRefreshToken(refreshToken);

  const {
    isLoading,
    error,
    data: favoris,
  } = useQuery(
    "favoris",
    async () => {
      const response = await fetch(`${API_URL}/favoris/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    {
      // Désactiver la requête tant que le token est rafraîchi
      enabled: token !== undefined,
      retry: 2,
    }
  );

  const deleteFormation = useMutation(
    async (id: number) => {
      if (!isRefreshing) {
        const response = await fetch(`${API_URL}/favoris/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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
      if (!isRefreshing) {
        const response = await fetch(`${API_URL}/favoris`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formation),
        });
        if (!response.ok) {
          throw new Error("Error on add in favorite");
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("favoris");
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
