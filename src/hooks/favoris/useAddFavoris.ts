import { useQueryClient } from "react-query";

import { Formation } from "../../../shared/formation/fomationv2.type";
import { fetchWithToken } from "../../../utils/fetchWithToken";
import { Toaster } from "../../components/ui/Notification/Toaster";
import { useAuthenticatedMutation } from "../useAuthenticatedMutation";

export const useAddFavoris = () => {
  const queryClient = useQueryClient();

  const addFormation = useAuthenticatedMutation(
    async (formation: Formation) => {
      const response = await fetchWithToken("/favoris", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formation),
      });
      if (
        response.status == 409 ||
        response.status == 308 ||
        response.status == 500
      ) {
        throw new Error("This formation is already in favoris");
      }
      if (!response.ok) {
        throw new Error("Error on add in favorite");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("favoris");
        queryClient.invalidateQueries("get_formation_is_fav");
      },
      onError(error) {
        Toaster.show({
          type: "error",
          text1: "Something wrong... 😔",
          text2: String(error),
        });
      },
    }
  );
  const handleAddFavoris = async (formation: Formation) => {
    await addFormation.mutateAsync(formation);
    Toaster.show({
      props: {
        text: "Formation enregistée.",
      },
    });
  };

  return { handleAddFavoris };
};
