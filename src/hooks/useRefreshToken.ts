import { useState, useEffect } from "react";
import { BASE_URL } from "../config";

type RefreshTokenResponse = {
  access: string;
};

const useRefreshToken = (
  token: string
): { accessToken?: string; isLoading: boolean } => {
  const [accessToken, setAccessToken] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const refreshToken = async () => {
      setIsLoading(true);

      try {
        const API_LINK = `${BASE_URL}/auth/token/refresh`;

        const response = await fetch(API_LINK, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data: RefreshTokenResponse = await response.json();
        setAccessToken(data.access);
      } catch (e) {
        console.log("Error in useRefreshToken hook: ", e);
      }

      setIsLoading(false);
    };

    refreshToken();
  }, [token]);

  return { accessToken, isLoading };
};

export { useRefreshToken };
