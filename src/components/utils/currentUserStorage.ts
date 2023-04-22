import { CurrentUserType } from "../../../shared/auth/currentUser.types";
import * as SecureStore from "expo-secure-store";

export const setCurrentUserStorage = async ({
  id,
  username,
  accessToken,
  refreshToken,
}: CurrentUserType & { refreshToken: string }) => {
  try {
    await SecureStore.setItemAsync("user_id", id.toString());
    await SecureStore.setItemAsync("username", username);
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  } catch (error: unknown) {
    console.log("Error in setCurrentUserStorage ", error);
  }
};

export const getCurrentUserStorage = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      const userId = await SecureStore.getItemAsync("user_id");
      const username = await SecureStore.getItemAsync("username");

      return {
        userId: Number(userId) || 0,
        username: username || "",
        accessToken,
      };
    }
  } catch (error: unknown) {
    console.log("Error in getCurrentUserStorage ", error);
  }
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
