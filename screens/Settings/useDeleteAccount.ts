import RNRestart from "react-native-restart";
import { useMutation } from "react-query";

import { axiosPrivate } from "$utils/axiosPrivate";

import { deleteCurrentUserStorage } from "../../src/components/utils/currentUserStorage";

const DELETE_USER = async () => {
  await axiosPrivate.delete("/me/remove");
};

export const useDeleteAccount = () => {
  const deleteUser = useMutation(async () => DELETE_USER, {
    onSuccess: async () => {
      await deleteCurrentUserStorage();
      RNRestart.Restart();
    },
  });

  const handleDeleteUser = async () => {
    await deleteUser.mutateAsync();
  };

  return { handleDeleteUser };
};
