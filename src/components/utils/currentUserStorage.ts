import * as SecureStore from "expo-secure-store";

import { CurrentUserType } from "../../../shared/auth/currentUser.types";

export const setCurrentUserStorage = async ({
  id,
  username,
  accessToken,
  refreshToken,
}: CurrentUserType & { refreshToken: string }) => {
  try {
    await SecureStore.setItemAsync("user_id", String(id));
    await SecureStore.setItemAsync("username", String(username));
    await SecureStore.setItemAsync("accessToken", String(accessToken));
    await SecureStore.setItemAsync("refreshToken", String(refreshToken));
  } catch (error: unknown) {
    console.log("Error in setCurrentUserStorage ", error);
  }
};

export const getCurrentUserStorage = async (): Promise<CurrentUserType> => {
  try {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      const userId = await SecureStore.getItemAsync("user_id");
      const username = await SecureStore.getItemAsync("username");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      return {
        id: Number(userId) || 0,
        username: username || "",
        accessToken,
        refreshToken: refreshToken || "",
      };
    }
  } catch (error: unknown) {
    console.log("Error in getCurrentUserStorage ", error);
  }

  return {
    id: 0,
    username: "",
    accessToken: "",
    refreshToken: "",
  };
};

export const deleteCurrentUserStorage = async () => {
  try {
    await SecureStore.deleteItemAsync("user_id");
    await SecureStore.deleteItemAsync("username");
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  } catch (error: unknown) {
    console.log("Error in deleteCurrentUserStorage ", error);
  }
};
