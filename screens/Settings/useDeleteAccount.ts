import { useMutation } from "react-query";

import { axiosPrivate } from "$utils/axiosPrivate";

import { useLogout } from "./useLogout";

const DELETE_USER = async () => {
  await axiosPrivate.delete("/auth/me/remove");
};

export const useDeleteAccount = () => {
  const { handleLogout } = useLogout();
  const deleteUser = useMutation(DELETE_USER, {
    onSuccess: async () => {
      await handleLogout();
    },
  });

  const handleDeleteUser = async () => {
    await deleteUser.mutateAsync();
  };

  return { handleDeleteUser };
};
