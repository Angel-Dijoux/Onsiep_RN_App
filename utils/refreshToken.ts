import { axiosPublic } from "./axiosPublic";
import {
  getCurrentUserStorage,
  setCurrentUserStorage,
} from "../src/components/utils/currentUserStorage";

type RefreshToken = {
  access: string;
};

export const refreshToken = async (): Promise<RefreshToken | undefined> => {
  const currentUserInfo = await getCurrentUserStorage();
  if (!currentUserInfo) return;

  const refreshToken = currentUserInfo?.refreshToken;
  try {
    const response = await axiosPublic.get("/auth/token/refresh", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
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
    console.error("Error in new refresh token : ", error);
  }
};

const maxAge = 10000;

// export const memoizedRefreshToken = mem(refreshToken, {
//   maxAge,
// });
