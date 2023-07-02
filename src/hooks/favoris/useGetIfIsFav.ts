import { useQuery } from "react-query";
import { BASE_URL } from "../../config"
import { useRefreshToken } from "../useRefreshToken";
import { useCurrentUser } from "../user/useCurrentUser";

export interface GetIsFavProps {
    is_fav: boolean,
    favori_id?: number,
}

export const useGetIfIsFav = (for_url: string) => {
    const { refreshToken } = useCurrentUser();
    const { accessToken: token, isLoading: isRefreshing } =
        useRefreshToken(refreshToken);

    const fetchIfFormationIsFav = async (for_url: string) => {
        if (!isRefreshing) {
            const response = await fetch(`${BASE_URL}/favoris/isFav/${for_url}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (!response.ok) {
                throw new Error("Error on fetchIfFormationIsFav")
            }
            return response.json()
        }

    }

    const getIsFav = useQuery<GetIsFavProps, Error>(["get_formation_is_fav", for_url], () => fetchIfFormationIsFav(for_url))

    return { getIsFav }
}