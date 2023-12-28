import { useQuery, useQueryClient } from "react-query";

import { axiosPrivate } from "$utils/axiosPrivate";

import { fetchWithToken } from "../../../utils/fetchWithToken";
import { UserFavoris } from "../../../utils/onisep.type";
import { useAuthenticatedMutation } from "../useAuthenticatedMutation";

const MOKED_DATA: UserFavoris = {
  "results": [
    {
      "formation": {
        "code_nsf": 335,
        "created_at": "Thu, 28 Dec 2023 15:55:01 GMT",
        "domain": "santé, social, sport/sport",
        "duree": "1 an",
        "id": "8ea997b7-8db9-503c-973e-0f166c0bf05c",
        "libelle": "BP JEPS spécialité éducateur sportif mention surf et disciplines associées",
        "niveau_de_sortie": "Bac ou équivalent",
        "tutelle": "Ministère chargé des sports",
        "type": "BP JEPS",
        "updated_at": "Thu, 28 Dec 2023 15:55:01 GMT",
        "url": "http://www.onisep.fr/http/redirection/formation/slug/FOR.8871"
      },
      "is_favorite": true
    }
  ],
  "size": 1
}

const FAVORIS = async (): Promise<UserFavoris> => {
  const response = await axiosPrivate.get("/favoris/");
  return response.data;
};

const useFavoris = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: favoris,
  } = useQuery<UserFavoris>("favoris", FAVORIS, { retry: 2 });

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
