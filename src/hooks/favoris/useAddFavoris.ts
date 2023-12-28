import { useQueryClient } from "react-query";

import { Formation } from "../../../shared/formation/fomationv2.type";
import { fetchWithToken } from "../../../utils/fetchWithToken";
import { Toaster } from "../../components/ui/Notification/Toaster";
import { useAuthenticatedMutation } from "../useAuthenticatedMutation";
import { axiosPrivate } from '$utils/axiosPrivate';

export const useAddFavoris = () => {
  const queryClient = useQueryClient();

  const addFormation = useAuthenticatedMutation(
    async (formation: Formation) => {
      const response = await axiosPrivate.post("/favoris/", formation);
      if (response.status !== 201) {
        throw new Error("This formation is already in favoris");
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
