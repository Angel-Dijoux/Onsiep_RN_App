import { axiosPublic } from "./axiosPublic";
import { setCachedAccessToken } from "../shared/auth/cachedAccessToken";
import {
  getCurrentUserStorage,
  setCurrentUserStorage,
} from "../src/components/utils/currentUserStorage";

type RefreshToken = {
  access: string;
};

export const refreshToken = async (): Promise<RefreshToken | undefined> => {
  const currentUserStored = await getCurrentUserStorage();
  if (!currentUserStored) return;

  const currentRefreshToken = currentUserStored.refreshToken;

  const response = await axiosPublic.get("/auth/token/refresh", {
    headers: {
      Authorization: `Bearer ${currentRefreshToken}`,
    },
  });

  const data: RefreshToken = response.data;
  setCachedAccessToken(data.access);

  setCurrentUserStorage({
    id: currentUserStored.id,
    username: currentUserStored.username,
    accessToken: data.access,
    refreshToken: currentRefreshToken,
  });

  return data;
};
