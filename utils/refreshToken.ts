import mem from "mem";
import {
  getCurrentUserStorage,
  setCurrentUserStorage,
} from "src/components/utils/currentUserStorage";

import { axiosPublic } from "./axiosPublic";

const refreshToken = async () => {
  const currentUserInfo = await getCurrentUserStorage();
  if (!currentUserInfo) return;

  const refreshToken = currentUserInfo?.refreshToken;
  try {
    const response = await axiosPublic.post("/auth/token/refresh", {
      refreshToken,
    });

    const data = response.data;
    setCurrentUserStorage({
      id: currentUserInfo?.userId,
      username: currentUserInfo?.username,
      accessToken: data.access,
      refreshToken: refreshToken as string,
    });

    return data;
  } catch (error) {
    console.log("Error in new refresh token : ", error);
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshToken, {
  maxAge,
});
