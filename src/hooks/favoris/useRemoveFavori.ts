import { fetchWithToken } from "$utils/fetchWithToken";

import { queryClient } from "../../../react-query.config";
import { Toaster } from "../../components/ui/Notification/Toaster";
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
    await removeFavori.mutateAsync(id);
    Toaster.show({
      props: {
        text: "Formation supprimée.",
      },
    });
  };

  return { handleRemoveFavori };
};
