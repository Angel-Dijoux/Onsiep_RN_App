import { fetchWithToken } from "$utils/fetchWithToken";

import { queryClient } from "../../../react-query.config";
import { useAuthenticatedMutation } from "../useAuthenticatedMutation";

export const useRemoveFavori = () => {
  const removeFavori = useAuthenticatedMutation(
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

  const handleRemoveFavori = async (id: number) => {
    console.log("NOP HERE");

    await removeFavori.mutateAsync(id);
  };

  return { handleRemoveFavori };
};
