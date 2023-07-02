import { useQuery } from "react-query";

import { getCurrentUserStorage } from "../components/utils/currentUserStorage";
import { BASE_URL } from "../config";

type RefreshTokenResponse = {
  access: string;
};

const useRefreshToken = () => {
  const fetchRefreshToken = async () => {
    const currentUserInfo = await getCurrentUserStorage();
    const refreshToken = currentUserInfo?.refreshToken;
    const API_LINK = `${BASE_URL}/auth/token/refresh`;

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
