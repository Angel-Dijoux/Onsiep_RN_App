import { axiosPrivate } from "$utils/axiosPrivate";
import { useQuery } from "react-query";

export const getUserInformation = "getUserInformation";

export type UserInformation = {
  email: string;
  id: number;
  username: string;
  profile_pic_url?: string;
};

const GET_USER_INFORMATION = async (): Promise<UserInformation> => {
  const response = await axiosPrivate.get("/auth/me");
  return response.data;
};

export const useGetUserInformation = () => {
  const { isLoading, data } = useQuery<UserInformation, Error>(
    [getUserInformation],
    GET_USER_INFORMATION
  );

  return { isLoading, data };
};
