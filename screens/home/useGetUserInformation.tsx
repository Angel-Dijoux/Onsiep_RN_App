import { axiosPrivate } from "$utils/axiosPrivate";
import { useQuery } from "react-query";

export const getUserInformation = "getUserInformation";

export type UserInformation = {
  name: string;
  profile_picture_url?: string;
};

const GET_USER_INFORMATION = async (): Promise<UserInformation> => {
  const response = await axiosPrivate.get("/auth/me");

  return response.data;
};

export const useGetUserInformation = () => {
  const { isLoading, data } = useQuery<UserInformation, Error>(
    [getUserInformation],
    () => GET_USER_INFORMATION
  );

  return { isLoading, data };
};
