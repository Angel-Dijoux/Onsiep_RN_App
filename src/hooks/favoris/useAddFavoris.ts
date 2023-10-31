import Toast from "react-native-toast-message";
import { useQueryClient } from "react-query";

import { Formation } from "../../../shared/formation/fomationv2.type";
import { fetchWithToken } from "../../../utils/fetchWithToken";
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
  const handleAddFavoris = async (formation: Formation) => {
    await addFormation.mutateAsync(formation);
    Toast.show({
      type: "success",
      text1: "Favoris",
      text2: "Formation enregistrée dans les favoris.",
    });
  };

  return { handleAddFavoris };
};
