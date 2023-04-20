import { useQuery, useMutation, useQueryClient } from "react-query";

import { BASE_URL } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const API_URL = BASE_URL;

const useFavoris = () => {
  const { userTokenRefresh } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { accessToken: token, isLoading: isRefreshing } =
    useRefreshToken(userTokenRefresh);

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
          Accept: "application/json",
          "Content-Type": "application/json",
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
      enabled: !isRefreshing,
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

  const handleDeleteFavoris = async (id: number) => {
    await deleteFormation.mutateAsync(id);
  };

  return { isLoading, error, favoris, handleDeleteFavoris };
};

export { useFavoris };
