import { getCurrentUserStorage } from "../src/components/utils/currentUserStorage";
import { Config } from "../src/config";

export const fetchWithToken = async (
  url: string,
  options: RequestInit
): Promise<Response> => {
  const currentUserInfo = await getCurrentUserStorage();
  const accessToken = currentUserInfo?.accessToken;

  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  const response = await fetch(`${Config.baseUrl}${url}`, options);
  return response;
};
