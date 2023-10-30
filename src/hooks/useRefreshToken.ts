import { useQuery } from "react-query";

import { getCurrentUserStorage } from "../components/utils/currentUserStorage";
import { Config } from "../config";

type RefreshTokenResponse = {
  access: string;
};

const useRefreshToken = () => {
  const fetchRefreshToken = async () => {
    const currentUserInfo = await getCurrentUserStorage();
    if (!currentUserInfo) return;

    const refreshToken = currentUserInfo?.refreshToken;
    const API_LINK = `${Config.baseUrl}/auth/token/refresh`;

    const response = await fetch(API_LINK, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error in fetchRefreshToken");
    }
    return response.json();
  };

  const { data, isLoading } = useQuery<RefreshTokenResponse, Error>(
    ["refresh_token"],
    fetchRefreshToken
  );

  return { data, isLoading };
};

export { useRefreshToken };
